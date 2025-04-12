document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const overlay = document.getElementById("overlay");
    const closeButton = document.querySelector(".close-button");
    const ctaButtons = document.querySelectorAll(".cta-button");
    const submitButton = document.querySelector("input[type='submit']");
    
    const touchedFields = {
        nome: false,
        email: false,
        celular: false,
        graduacao: false,
        cargo: false,
        salario: false
    };
    
    function openModal() {
        modal.style.display = "block";
        overlay.style.display = "block";
    }
    
    function closeModal() {
        modal.style.display = "none";
        overlay.style.display = "none";
        form.reset();
        hideAllErrors();
        updateSubmitButtonState();
        
        Object.keys(touchedFields).forEach(key => {
            touchedFields[key] = false;
        });
    }
    
    ctaButtons.forEach(button => {
        button.addEventListener("click", openModal);
    });
    
    closeButton.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);
    
    const form = document.querySelector("form");
    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");
    const celularInput = document.getElementById("celular");
    const graduacaoInput = document.getElementById("graduacao");
    const cargoInput = document.getElementById("cargo");
    const salarioInput = document.getElementById("salario");
    
    salarioInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = (value/100).toFixed(2) + '';
        value = value.replace(".", ",");
        value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        e.target.value = 'R$ ' + value;
        if (touchedFields.salario) validateSalario();
        updateSubmitButtonState();
    });
    
    celularInput.addEventListener('input', function(e) {
        let input = e.target;
        let value = input.value.replace(/\D/g, '');
        let formattedValue = '';
        
        if (value.length > 0) formattedValue = '(' + value.substring(0, 2);
        if (value.length > 2) formattedValue += ') ' + value.substring(2, 3);
        if (value.length > 3) formattedValue += ' ' + value.substring(3, 7);
        if (value.length > 7) formattedValue += '-' + value.substring(7, 11);
        
        input.value = formattedValue;
        if (touchedFields.celular) validateCelular();
        updateSubmitButtonState();
    });
    
    function setupValidation(inputElement, validationFn, fieldName) {
        inputElement.addEventListener('focus', function() {
            touchedFields[fieldName] = true;
        });
        
        inputElement.addEventListener('input', function() {
            if (touchedFields[fieldName]) {
                validationFn();
            }
            updateSubmitButtonState();
        });
        
        inputElement.addEventListener('blur', function() {
            touchedFields[fieldName] = true;
            validationFn();
            updateSubmitButtonState();
        });
    }
    
    setupValidation(nomeInput, validateNome, 'nome');
    setupValidation(emailInput, validateEmail, 'email');
    setupValidation(celularInput, validateCelular, 'celular');
    setupValidation(graduacaoInput, validateGraduacao, 'graduacao');
    setupValidation(cargoInput, validateCargo, 'cargo');
    setupValidation(salarioInput, validateSalario, 'salario');
    
    function validateNome() {
        const nome = nomeInput.value.trim();
        if (nome === '') {
            if (touchedFields.nome) {
                showError('nome', 'Por favor, insira seu nome completo');
            }
            return false;
        }
        hideError('nome');
        return true;
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        if (email === '') {
            if (touchedFields.email) {
                showError('email', 'Por favor, insira seu email');
            }
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            if (touchedFields.email) {
                showError('email', 'Por favor, insira um email válido');
            }
            return false;
        }
        
        hideError('email');
        return true;
    }

    function validateCelular() {
        const celular = celularInput.value.replace(/\D/g, '');
        if (celular.length < 11) {
            if (touchedFields.celular) {
                showError('celular', 'Por favor, insira um número válido com DDD');
            }
            return false;
        }
        hideError('celular');
        return true;
    }

    function validateGraduacao() {
        const graduacao = graduacaoInput.value;
        if (graduacao === '') {
            if (touchedFields.graduacao) {
                showError('graduacao', 'Por favor, selecione sua formação');
            }
            return false;
        }
        hideError('graduacao');
        return true;
    }

    function validateCargo() {
        const cargo = cargoInput.value.trim();
        if (cargo === '') {
            if (touchedFields.cargo) {
                showError('cargo', 'Por favor, insira seu cargo');
            }
            return false;
        }
        hideError('cargo');
        return true;
    }

    function validateSalario() {
        const salario = salarioInput.value.trim();
        if (salario === '' || salario === 'R$ 0,00') {
            if (touchedFields.salario) {
                showError('salario', 'Por favor, insira sua faixa salarial');
            }
            return false;
        }
        hideError('salario');
        return true;
    }
    
    function showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}Error`);
        const inputElement = document.getElementById(fieldId);
        
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        inputElement.classList.add('error-input');
    }
    
    function hideError(fieldId) {
        const errorElement = document.getElementById(`${fieldId}Error`);
        const inputElement = document.getElementById(fieldId);
        
        errorElement.style.display = 'none';
        inputElement.classList.remove('error-input');
    }
    
    function hideAllErrors() {
        ['nome', 'email', 'celular', 'graduacao', 'cargo', 'salario'].forEach(fieldId => {
            hideError(fieldId);
        });
    }
    
    function updateSubmitButtonState() {
        const isNomeValid = validateNome();
        const isEmailValid = validateEmail();
        const isCelularValid = validateCelular();
        const isGraduacaoValid = validateGraduacao();
        const isCargoValid = validateCargo();
        const isSalarioValid = validateSalario();
        
        const isNomeFilled = nomeInput.value.trim() !== '';
        const isEmailFilled = emailInput.value.trim() !== '';
        const isCelularFilled = celularInput.value.replace(/\D/g, '').length >= 11;
        const isGraduacaoFilled = graduacaoInput.value !== '';
        const isCargoFilled = cargoInput.value.trim() !== '';
        const isSalarioFilled = salarioInput.value.trim() !== '' && salarioInput.value.trim() !== 'R$ 0,00';
        
        submitButton.disabled = !(isNomeValid && isEmailValid && isCelularValid && 
                                isGraduacaoValid && isCargoValid && isSalarioValid &&
                                isNomeFilled && isEmailFilled && isCelularFilled &&
                                isGraduacaoFilled && isCargoFilled && isSalarioFilled);
    }
    
    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        
        Object.keys(touchedFields).forEach(key => {
            touchedFields[key] = true;
        });
        
        const isNomeValid = validateNome();
        const isEmailValid = validateEmail();
        const isCelularValid = validateCelular();
        const isGraduacaoValid = validateGraduacao();
        const isCargoValid = validateCargo();
        const isSalarioValid = validateSalario();
        
        if (!isNomeValid || !isEmailValid || !isCelularValid || 
            !isGraduacaoValid || !isCargoValid || !isSalarioValid) {
            updateSubmitButtonState();
            return;
        }
        
        const originalButtonValue = submitButton.value;
        
        try {
            submitButton.disabled = true;
            submitButton.value = "Enviando...";
            
            const formData = {
                nome: nomeInput.value.trim(),
                email: emailInput.value.trim(),
                celular: celularInput.value.replace(/\D/g, ''),
                graduacao: graduacaoInput.value,
                cargo: cargoInput.value.trim(),
                salario: salarioInput.value.trim()
            };
            
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
                closeModal();
            } else {
                alert("Erro: " + (result.message || "Erro desconhecido"));
            }
        } catch (error) {
            alert("Erro ao enviar os dados. Tente novamente mais tarde.");
            console.error("Erro:", error);
        } finally {
            submitButton.disabled = false;
            submitButton.value = originalButtonValue;
        }
    });
});
