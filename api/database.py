from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

eng = create_async_engine("sqlite+aiosqlite:///base.db")

session = async_sessionmaker(eng, expire_on_commit=False)

class OrdersTable():
    pass