def pickBest(coins,due):
    if due == 0: return []
    for c in coins:
        if c<= due: return [c] + pickBest(coins,due-c)

coins = [1,5,10,25]
coins = sorted(coins,reverse=True)

print pickBest(coins,40)