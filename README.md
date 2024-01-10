# Proiect-tehnologii-web-2023
Proiect tehnologii web 2023 - Mihăilă Tiberiu, Martalogu Alexandru, Popescu Gabriel 1091D

Structura bazelor de date:

    Tabela profesori: Stochează informații despre profesori.
    Tabela studenti: Conține date despre studenți.
    Tabela proiect: Păstrează detalii despre proiecte. 
    Tabela livrabil: Menține informații legate de livrabilele proiectelor.
    Tabela recenzie: Stocarea recenziilor sau a notelor asociate proiectelor.

Relații tabele: <br>
    `Studenti - MP ai mai multor proiecte, jurati ai mai multor proiecte, mai multe reviews` <br>
    `Proiect - are mai multe reviews, mai multi MP, mai multi jurati, mai multe livrabile, mai multe reviews` <br>
    `Livrabil - apartine unui singur proiect, un proiect poate avea mai multe livrabile` <br>
    `Recenzie - apartine unui singur proiect, un proiect poate avea mai multe recenzii` <br>

Metodele Backend:

Pentru utilizatorii nelogati:

    > createUserStudent(): Pentru a crea un cont pentru un student.
    > createUserProf(): Pentru a crea un cont pentru un profesor.
    > loginStudent(): Logarea unui student în sistem.
    > loginProf(): Logarea unui profesor în sistem.

Pentru utilizatorii logati ca student:

    > createProject(): Adăugarea unui proiect nou.
    > joinProject(): Aderarea la un proiect existent.
    > editProject(): Editarea detaliilor unui proiect.
    > addDeliverable(): Adăugarea de livrabile la un proiect.
    > editDeliverable(): Editarea detaliilor livrabilelor.
    > addOwnReview(): Adăugarea recenziei personale.

Triggere și funcționalități speciale:

    > chooseChiefMemberOfJury(): Desemnarea unui membru al juriului ca și "membru sef".
    > chooseJurors(): Alegerea juraților pentru un proiect, eventual la apropierea deadline-ului.

Funcționalități specifice membrului șef al juriului:

    > addOthersReview(): Adăugarea recenziilor pentru alți membri ai juriului.
    > editOthersReview(): Editarea recenziilor altor membri ai juriului.

Pentru utilizatorii logati ca profesor:

    > getProjects(): Obținerea informațiilor despre proiecte.
    > getReviewsForProject(): Obținerea recenziilor asociate unui proiect.
