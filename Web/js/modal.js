export class Modal
{
    constructor()
    {
        this.modal = document.getElementById('modal');
        this.btnClose = document.getElementById('closeButton');
        this.btnCancel = document.getElementById('cancelButton');
        this.form = document.getElementById('estateForm');
        this.modalTitle = document.getElementById('modalTitle');
        this.onSubmit = null;

        this.initEventListeners();
        this.initValidation();
    }
    
    initEventListeners()
    {
        this.btnClose.addEventListener('click', () => this.close());
        this.btnCancel.addEventListener('click', () => this.close());
        this.modal.addEventListener('mousedown', (e) =>
        {
            if (e.target === this.modal)
            {
                this.close();
            }
        });
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    // Validation

    initValidation() {
        const fields = this.form.querySelectorAll("input, select, textarea");

        fields.forEach(field => {
            field.addEventListener("input", () => this.validateField(field));
            field.addEventListener("blur", () => this.validateField(field));
        });
    }

    validateField(field) {
        field.setCustomValidity("");

        const value = field.value.trim();

        if (field.id === "estateName") {
            if (/^\d/.test(value)) {
                field.setCustomValidity("Name cannot starts with digit");
            }
        }

        if (field.id === "estateArea") {
            const area = parseFloat(value);
            if (area < 10)
            {
                field.setCustomValidity("Value is less than 10 m2");
            }
        }

        if (field.id === "estatePrice") {
            const price = parseFloat(value);
            if (price < 1000)
            {
                field.setCustomValidity("Value is less than 1000 USD");
            }
        }

        if (field.id === "estateLocation") {
            if (/^\d/.test(value)) {
                field.setCustomValidity("Location cannot starts with digit");
            }
        }

        const errorSpan = field.parentElement.querySelector(".error_message");
        if (!field.checkValidity()) {
            errorSpan.textContent = this.getErrorMessage(field);
        } else {
            errorSpan.textContent = "";
        }

        return field.checkValidity();
    }


    getErrorMessage(field) {
        const validity = field.validity;

        if (validity.valueMissing) return "This field is required"

        if (validity.typeMismatch) {
            if (field.type == "url") return "Enter valid URL";
        }

        if (validity.patternMismatch) return field.title || "Format does not match with pattern";

        if (validity.tooShort) return `Min length: ${field.minLength} chars`;
        if (validity.tooLong) return `Max length: ${field.maxLength} chars`;

        if (validity.rangeOverflow) return `Max value: ${field.max}`;
        if (validity.rangeUnderflow) return `Min value: ${field.min}`;

        if (validity.customError) return field.validationMessage;

        return "Invalid value";
    }

    // Main
    open()
    {
        this.modal.classList.add('active');
        this.modalTitle.textContent = 'Add real estate';
    }

    close()
    {
        this.modal.classList.remove('active');
        this.form.reset();
    }

    handleSubmit(e)
    {
        e.preventDefault();

        if (!this.form.checkValidity()) {
            const fields = this.form.querySelectorAll("input, select, textarea");
            fields.forEach(field => this.validateField(field));
            return;
        }

        const form = document.getElementById('estateForm');
        const formData = Object.fromEntries(new FormData(form));

        if (this.onSubmit)
        {
            this.close();
            this.onSubmit(formData);
        }
    }
}