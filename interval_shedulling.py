"""
Nome: João Pedro Gomes Cabra = inter    
Matricula: 140145842
Atividade: Interval Scheduling
Objetivo: Retornar o maior conjunto de atividades mutuamente compatíveis.

"""

def interval_scheduling (start_time, finish_time):
    # 0 a n-1 itens
    index_tasks = list(range(len(start_time)))

    index_tasks.sort(key=lambda i: finish_time[i])

    maximal_tasks = set()
    first_finish_time = 0

    for i in index_tasks:
        if start_time[i] >= first_finish_time:
            maximal_tasks.add(i)
            first_finish_time = finish_time[i]

    return maximal_tasks

tasks = int(input('Digite o número de tarefas: '))
start_time = input('Digite o tempo de inicio de {} tarefas (ordinal): '.format(tasks)).split()
start_time = [int(start) for start in start_time]
finish_time = input('Digite o tempo de término de {} tarefas (ordinal): '.format(tasks)).split()
finish_time = [int(finish) for finish in finish_time]

result = interval_scheduling(start_time, finish_time)
result = list(map(int,result))

print('Número de atividades compatíveis: ', result)