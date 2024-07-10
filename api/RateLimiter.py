from fastapi import HTTPException, Depends, Request
from functools import wraps
import time

calls = {}

def ClearCallsDict(callsDict : dict, url : str, timeFrame : int):
    callsDict[url] = {k : v for k,v in callsDict[url].items() if len([x for x in v if time.time() < x + timeFrame]) > 0}

def RateLimitByIP(maxCalls : int, timeFrame : int):
    def decorator(func):
        @wraps(func)
        async def wrapper(request : Request, *args, **kwargs):
            now = int(time.time())
            request_url = str(request.url)
            print(calls)
            if request_url in calls:
                ClearCallsDict(calls, request_url, timeFrame)
                if request.client.host in calls[request_url]:
                    if len([x for x in calls[request_url][request.client.host] if time.time() < x + timeFrame]) > maxCalls:
                        raise HTTPException(status_code=429, detail="Rate limit exceeded")
                    calls[request_url][request.client.host].append(now)
                else:
                    calls[request_url][request.client.host] = [now]
            else:
                calls[request_url] = {request.client.host: [now]}

            return await func(request, *args, **kwargs)
        
        return wrapper
    
    return decorator

