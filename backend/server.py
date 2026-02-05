from fastapi import FastAPI

app = FastAPI(title="backend-stub", docs_url=None, redoc_url=None, openapi_url=None)


@app.get("/health")
def health():
    return {"ok": True}


@app.get("/")
def root():
    return {"service": "backend-stub"}
