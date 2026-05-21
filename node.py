# Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from blockchain import Blockchain
from transaction import Transaction
from wallet import Wallet
import uvicorn

app = FastAPI(title="ShadowChat")
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

bc = Blockchain()
wallet = Wallet()

class TipRequest(BaseModel):
    amount: float = 4.44

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/shadowchat", response_class=HTMLResponse)
async def feed(request: Request):
    return templates.TemplateResponse("shadowchat.html", {"request": request})

# All other routes from previous batches (wallet, ico, exchange, shop, marketplace, live, casino, governance, services, booking, profile, staking, etc.)

@app.post("/tip")
def tip(req: TipRequest):
    tx = Transaction(wallet.address, "shadow_treasury", req.amount, wallet.public_key.to_string())
    tx.sign(wallet.sign)
    if tx.is_valid():
        bc.create_transaction(tx)
        return {"status": f"✅ {req.amount} SKY444 tipped! 2% burned."}
    raise HTTPException(400, "Invalid transaction")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=4444)