class DeleteModal
{
    constructor()
    {
        this.deleteModal = document.getElementById('deleteModal');
        this.btnDelete = document.getElementById('deleteButton');
        this.btnCancel = document.getElementById('deleteCancelButton');
        this.onDelete = null;
        this.deletionId = 0;

        this.initEventListeners();
    }
    
    // Inits
    initEventListeners()
    {
        this.btnDelete.addEventListener('click', () =>
        {
            this.onDelete(this.deletionId);
            this.close()
        });

        this.btnCancel.addEventListener('click', () => 
        {
            this.close();
        });

        this.deleteModal.addEventListener('mousedown', (e) =>
        {
            if (e.target === this.deleteModal)
            {
                this.close();
            }
        });
    }

    // Main funcs
    open()
    {
        this.deleteModal.classList.add('active');
    }

    close()
    {
        this.deleteModal.classList.remove('active');
    }
}

export const deleteModal = new DeleteModal();