from fastapi import FastAPI, HTTPException
from models import Order, AddOrderModel
import telegram_service
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)



@app.post("/api/order")
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