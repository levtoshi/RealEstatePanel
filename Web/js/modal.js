export class Modal
{
    constructor()
    {
        this.modal = document.getElementById('modal');
        this.btnClose = document.getElementById('close_button');
        this.btnCancel = document.getElementById('cancel_button');
        this.form = document.getElementById('estate_form');
        this.modalTitle = document.getElementById('modal_title');
        this.onSubmit = null;

        this.initEventListeners();
    }
    
    initEventListeners()
    {
        this.btnClose.addEventListener('click', () => this.close());
        this.btnCancel.addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (e) =>
        {
            if (e.target === this.modal)
            {
                this.close();
            }
        });
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

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

        const form = document.getElementById('estate_form');
        const formData = Object.fromEntries(new FormData(form));

        if (this.onSubmit)
        {
            this.onSubmit(formData);
        }
    }
}