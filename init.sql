CREATE DATABASE IF NOT EXISTS interview_scheduler;

USE interview_scheduler;

CREATE TABLE jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    requirements TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE candidates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    current_ctc DECIMAL(10,2),
    expected_ctc DECIMAL(10,2),
    notice_period INT,
    experience INT
);

CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT,
    candidate_id INT,
    date_time DATETIME NOT NULL,
    status ENUM('Scheduled', 'Completed', 'Cancelled') DEFAULT 'Scheduled',
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

CREATE TABLE conversations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_id INT,
    transcript TEXT,
    entities_extracted JSON,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);
