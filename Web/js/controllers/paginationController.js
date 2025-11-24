class PaginationController
{
    constructor()
    {
        this.prevBtn = document.getElementById("prevPage");
        this.firstElBtn = document.getElementById("firstPage");
        this.dotsBefore = document.getElementById("dotsBefore");
        this.currentElBtn = document.getElementById("currentPage");
        this.lastElBtn = document.getElementById("lastPage");
        this.nextBtn = document.getElementById("nextPage");

        this.paginationPagesAmount = 0;
        this.pageElementAmount = 14;
        this.paginationPage = 1;

        this.currentElShown = false;

        this.renderCardsCallback = null;

        this.initEventListeners();
    }

    // Inits
    initEventListeners()
    {
        this.prevBtn.addEventListener("click", () =>
        {
            if (this.paginationPage > 1)
            {
                if (this.paginationPage === this.paginationPagesAmount)
                {
                    this.showCurrentPage();
                }
                else if (this.paginationPage === 2)
                {
                    this.unshowCurrentPage();
                }
                
                this.paginationPage--;
                this.currentElBtn.textContent = this.paginationPage;
                this.updateFirstLastActive();
                this.renderCardsCallback();
            }
        });

        this.nextBtn.addEventListener("click", () =>
        {
            if (this.paginationPage < this.paginationPagesAmount)
            {
                if (this.paginationPage === 1)
                {
                    this.showCurrentPage();
                }
                else if (this.paginationPage === this.paginationPagesAmount - 1)
                {
                    this.unshowCurrentPage();
                }
                
                this.paginationPage++;
                this.currentElBtn.textContent = this.paginationPage;
                this.updateFirstLastActive();
                this.renderCardsCallback();
            }
        });

        this.firstElBtn.addEventListener("click", () =>
        {
            if (this.paginationPage != 1)
            {
                this.paginationPage = 1;
                this.updateFirstLastActive();
                this.renderCardsCallback();
                this.unshowCurrentPage();
            }
        });

        this.lastElBtn.addEventListener("click", () =>
        {
            if (this.paginationPage != this.paginationPagesAmount)
            {
                this.paginationPage = this.paginationPagesAmount;
                this.updateFirstLastActive();
                this.renderCardsCallback();
                this.unshowCurrentPage();
            }
        });
    }

    // Show / Unshow page
    showCurrentPage()
    {
        if (!this.currentElShown)
        {
            this.dotsBefore.classList.remove("disable");
            this.currentElBtn.classList.remove("disable");

            this.currentElShown = !this.currentElShown;
        }
    }

    unshowCurrentPage()
    {
        if (this.currentElShown)
        {
            this.dotsBefore.classList.add("disable");
            this.currentElBtn.classList.add("disable");
            
            this.currentElShown = !this.currentElShown;
        }
    }

    // Update last pagination page
    updateLastPage(elementsAmount)
    {
        let oldPaginationPagesAmount = this.paginationPagesAmount;
        let oldPaginationPage = this.paginationPage;

        this.paginationPagesAmount = Math.ceil(elementsAmount / this.pageElementAmount);
        
        if (oldPaginationPagesAmount)
        {
            this.paginationPage = Math.ceil((this.paginationPagesAmount / oldPaginationPagesAmount) * oldPaginationPage);

            if (this.paginationPage === 1)
            {
                this.unshowCurrentPage();
            }
            else if (this.paginationPage === this.paginationPagesAmount)
            {
                this.unshowCurrentPage();
            }
        }

        this.currentElBtn.textContent = this.paginationPage;
        this.lastElBtn.textContent = this.paginationPagesAmount;
        this.updateFirstLastActive();
    }

    updateFirstLastActive()
    {
        if (this.firstElBtn)
        {
            if (this.paginationPage === 1)
                this.firstElBtn.classList.add('active');
            else
                this.firstElBtn.classList.remove('active');
        }

        if (this.lastElBtn)
        {
            if (this.paginationPage === this.paginationPagesAmount)
                this.lastElBtn.classList.add('active');
            else
                this.lastElBtn.classList.remove('active');
        }
    }

    // Getters
    getPaginationPage()
    {
        return this.paginationPage;
    }
    
    getPageElementAmount()
    {
        return this.pageElementAmount;
    }
}

export const paginationController = new PaginationController();