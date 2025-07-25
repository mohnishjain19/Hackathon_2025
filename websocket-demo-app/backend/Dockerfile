
FROM python:3.11-slim

# Set working directory inside the container
WORKDIR /app

# Copy backend and frontend folders
COPY . .
#COPY frontend/ ./frontend/

# Create virtual environment and install dependencies
RUN python3 -m venv env && \
    . env/bin/activate && \
    pip install --upgrade pip && \
    pip install -r requirements.txt

# Expose the port your backend listens on
EXPOSE 8080

# Start the backend WebSocket server
CMD ["/bin/bash", "-c", ". env/bin/activate && python main.py"]
