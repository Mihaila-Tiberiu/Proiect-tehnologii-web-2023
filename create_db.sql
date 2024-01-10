-- Tabela pentru profesori
CREATE TABLE Profesori (
    ProfesorID INTEGER PRIMARY KEY AUTOINCREMENT,
    Nume TEXT NOT NULL,
    Prenume TEXT NOT NULL,
    Parola TEXT NOT NULL
);

-- Tabela pentru studenti
CREATE TABLE Studenti (
    StudentID INTEGER PRIMARY KEY AUTOINCREMENT,
    Nume TEXT NOT NULL,
    Prenume TEXT NOT NULL,
    Parola TEXT NOT NULL,
    ProiectID INTEGER REFERENCES Proiect(ProiectID)
);

-- Tabela pentru proiecte
CREATE TABLE Proiect (
    ProiectID INTEGER PRIMARY KEY AUTOINCREMENT,
    NumeProiect TEXT NOT NULL,
    Descriere TEXT,
    NotaProiect DECIMAL(5, 2) CHECK (NotaProiect >= 1 AND NotaProiect <= 10)
    --JuratSefID INTEGER REFERENCES Studenti(StudentID)
);

-- Tabela pentru asocierea studentilor cu proiectele ca MP (Membri ai Proiectului)
CREATE TABLE StudentiProiectMP (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    StudentID INTEGER REFERENCES Studenti(StudentID),
    ProiectID INTEGER REFERENCES Proiect(ProiectID),
    UNIQUE(StudentID, ProiectID)
);

-- Tabela pentru asocierea studentilor cu proiectele ca jurati
CREATE TABLE StudentiLivrabilJurati (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    StudentID INTEGER REFERENCES Studenti(StudentID),
    LivrabilID INTEGER REFERENCES Livrabil(LivrabilID),
    UNIQUE(StudentID, LivrabilID)
);

-- Tabela pentru livrabile
CREATE TABLE Livrabil (
    LivrabilID INTEGER PRIMARY KEY AUTOINCREMENT,
    ProiectID INTEGER REFERENCES Proiect(ProiectID),
    NumeLivrabil TEXT NOT NULL,
    VideoDemonstrativ TEXT,
    LinkServer TEXT,
    Deadline TEXT,
    RecenzieID INTEGER REFERENCES Recenzie(RecenzieID),
    UNIQUE(ProiectID, NumeLivrabil)
);

-- Tabela pentru recenzii
CREATE TABLE Recenzie (
    RecenzieID INTEGER PRIMARY KEY AUTOINCREMENT,
    LivrabilID INTEGER REFERENCES Livrabil(LivrabilID),
    StudentID INTEGER REFERENCES Studenti(StudentID),
    Nota DECIMAL(5, 2) CHECK (Nota >= 1 AND Nota <= 10),
    ReviewText TEXT,
    UNIQUE(LivrabilID, StudentID)
);

