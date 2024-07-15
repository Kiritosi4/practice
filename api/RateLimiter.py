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
            client_ip = request.headers.get("X-Forwarded-For")
            
            if request_url in calls:
                ClearCallsDict(calls, request_url, timeFrame)
                if client_ip in calls[request_url]:
                    if len([x for x in calls[request_url][client_ip] if time.time() < x + timeFrame]) > maxCalls:
                        raise HTTPException(status_code=429, detail="Rate limit exceeded")
                    calls[request_url][client_ip].append(now)
                else:
                    calls[request_url][client_ip] = [now]
            else:
                calls[request_url] = {client_ip: [now]}

            return await func(request, *args, **kwargs)
        
        return wrapper
    
    return decorator

