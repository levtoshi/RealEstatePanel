class PaginationController {
    constructor() {
        // Buttons
        this.prevBtn = document.getElementById("prevPage");
        this.nextBtn = document.getElementById("nextPage");
        this.firstBtn = document.getElementById("firstPage");
        this.currentBtn = document.getElementById("currentPage");
        this.lastBtn = document.getElementById("lastPage");
        this.dotsBefore = document.getElementById("dotsBefore");

        // Pagination
        this.page = 1;
        this.totalPages = 0;
        this.itemsPerPage = 14;

        this.currentVisible = false;
        this.renderCardsCallback = null;

        this.addListeners();
    }

    // Inits
    addListeners() {
        this.prevBtn.addEventListener("click", () => this.goPrev());
        this.nextBtn.addEventListener("click", () => this.goNext());
        this.firstBtn.addEventListener("click", () => this.goFirst());
        this.lastBtn.addEventListener("click", () => this.goLast());
    }

    goPrev() {
        if (this.page <= 1) return;

        this.setPage(this.page - 1);

        if (this.page === 1) 
        {
            this.hideCurrent();
        }
        else
        {
            this.showCurrent();
        }
    }

    goNext() {
        if (this.page >= this.totalPages) return;

        if (this.page === 1) 
        {
            this.showCurrent();
        }
        if (this.page === this.totalPages - 1)
        {
            this.hideCurrent();
        }

        this.setPage(this.page + 1);
    }

    goFirst() {
        if (this.page === 1) return;
        this.hideCurrent();
        this.setPage(1);
    }

    goLast() {
        if (this.page === this.totalPages) return;
        this.hideCurrent();
        this.setPage(this.totalPages);
    }

    // Core logic
    setPage(newPage) {
        this.page = newPage;
        this.currentBtn.textContent = this.page;
        this.updateActiveStates();

        if (this.renderCardsCallback)
            this.renderCardsCallback();

        //this.debug();
    }

    // Show / Hide current page
    showCurrent() {
        if (this.currentVisible) return;

        this.dotsBefore.classList.remove("disable");
        this.currentBtn.classList.remove("disable");
        this.currentVisible = true;
    }

    hideCurrent() {
        if (!this.currentVisible) return;

        this.dotsBefore.classList.add("disable");
        this.currentBtn.classList.add("disable");
        this.currentVisible = false;
    }

    // Сhange
    updateLastPage(totalItems) {
        const prevTotalPages = this.totalPages;
        const prevPage = this.page;

        this.totalPages = Math.ceil(totalItems / this.itemsPerPage);

        if (prevTotalPages) {
            this.page = Math.ceil((this.totalPages / prevTotalPages) * prevPage);

            if (this.page <= 1) this.hideCurrent();
            else if (this.page >= this.totalPages) this.hideCurrent();
            else this.showCurrent();
        } else if (totalItems > 0) {
            this.page = 1;
        }

        this.firstBtn.textContent = totalItems === 0 ? 0 : 1;
        this.currentBtn.textContent = this.page;
        this.lastBtn.textContent = this.totalPages;

        this.updateActiveStates();
        //this.debug();
    }

    // Update state
    updateActiveStates() {
        this.firstBtn.classList.toggle("active", this.page === 1);
        this.lastBtn.classList.toggle("active", this.page === this.totalPages);
    }

    // Getters
    getPaginationPage() {
        return this.page;
    }

    getPageElementAmount() {
        return this.itemsPerPage;
    }

    // Debug
    debug() {
        console.log(`page: ${this.page}`);
        console.log(`totalPages: ${this.totalPages}`);
        console.log(`currentVisible: ${this.currentVisible}`);
        console.log("--------------------------------------------------");
    }
}

export const paginationController = new PaginationController();
