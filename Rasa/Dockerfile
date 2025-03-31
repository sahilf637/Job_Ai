FROM rasa/rasa:latest

# Switch to root to install additional packages
USER root

WORKDIR /app
COPY . /app

# Install dependencies using --no-cache-dir to avoid permission issues
RUN pip install --no-cache-dir -r requirements.txt

# Switch back to the default non-root user (usually UID 1001)
USER 1001

CMD ["run", "--enable-api", "--cors", "*"]
