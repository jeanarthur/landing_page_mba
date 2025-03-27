document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            celular: document.getElementById("celular").value,
        };

        try {
            const response = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Cadastro realizado com sucesso!");
            } else {
                alert("Erro: " + result.message);
            }
        } catch (error) {
            alert("Erro ao enviar os dados. Tente novamente mais tarde.");
            console.error("Erro:", error);
        }
    });
});