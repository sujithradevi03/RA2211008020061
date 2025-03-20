from fastapi import FastAPI, HTTPException
import httpx
import asyncio

app = FastAPI()

# Constants
WINDOW_SIZE = 10
API_URLS = {
    "p": "http://20.244.56.144/test/primes",
    "f": "http://20.244.56.144/test/fibo",
    "e": "http://20.244.56.144/test/even",
    "r": "http://20.244.56.144/test/rand"
}

# Store numbers in a list (fixed-size window)
window = []

async def fetch_numbers(number_id: str):
    """Fetch numbers from the third-party API with a timeout of 500ms."""
    url = API_URLS.get(number_id)
    if not url:
        raise HTTPException(status_code=400, detail="Invalid number ID")
    
    try:
        async with httpx.AsyncClient(timeout=0.5) as client:
            response = await client.get(url)
            response.raise_for_status()
            data = response.json()
            return data.get("numbers", [])
    except (httpx.HTTPError, httpx.RequestError, asyncio.TimeoutError):
        return []

@app.get("/numbers/{number_id}")
async def get_numbers(number_id: str):
    global window
    prev_state = window.copy()
    
    # Fetch new numbers
    new_numbers = await fetch_numbers(number_id)
    
    # Filter out duplicates
    unique_numbers = [num for num in new_numbers if num not in window]
    
    # Maintain window size
    window.extend(unique_numbers)
    if len(window) > WINDOW_SIZE:
        window = window[-WINDOW_SIZE:]  # Keep only the last WINDOW_SIZE elements
    
    # Calculate average
    avg = round(sum(window) / len(window), 2) if window else 0.0
    
    return {
        "windowPrevState": prev_state,
        "windowCurrState": window,
        "numbers": new_numbers,
        "avg": avg
    }
