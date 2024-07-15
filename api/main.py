from fastapi import FastAPI, HTTPException, Depends, Request
from .models import Order, AddOrderModel
from . import telegram_service
from fastapi.middleware.cors import CORSMiddleware
from fastapi_limiter import FastAPILimiter
from fastapi_limiter.depends import RateLimiter
from .RateLimiter import RateLimitByIP

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://stroymedium.ru", "http://stroymedium.ru"],
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.post("/api/order")
@RateLimitByIP(maxCalls=1, timeFrame=900)
async def SendOrder(order : AddOrderModel):
    if order.method == "mail" and (order.email == None or'@'not in order.email or len(order.email) < 5):
        raise HTTPException(status_code=400, detail="Почта указана некорректно")
    
    if order.method != "mail" and (order.phone == None or not order.phone.startswith("+7") or len(order.phone) != 18):
        print(order.phone.startswith("+7"), len(order.phone) != 18)
        raise HTTPException(status_code=400, detail="Номер телефона указан некорректно")
    
    if len(order.name) < 2 or len(order.message) < 3:
        raise HTTPException(status_code=400, detail="Некорректное поле имени или сообщения")
    
    await telegram_service.AsyncSendMessageToMainChat(f"===Новая заявка===\n👤 Имя: {order.name}\n📌 Метод связи: {order.method}\n📞 Телефон: {order.phone}\n📧 Почта: {order.email}\n\n💬Сообщение:\n{order.message}")

    return order

@app.get("/api/order")
@RateLimitByIP(maxCalls=2, timeFrame=10)
async def Test(request : Request):
    return request.headers.get("X-Forwarded-For")