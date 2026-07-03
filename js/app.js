// WWN - Wealth & Worth Navigator
// Advanced Financial Management System

class WWNApp {
    constructor() {
        this.data = {
            transactions: [],
            accounts: [],
            budgets: [],
            investments: [],
            debts: [],
            receivables: [],
            goals: [],
            categories: {
                income: ['Gaji', 'Bonus', 'Investasi', 'Hadiah', 'Lainnya'],
                expense: ['Makanan', 'Transportasi', 'Belanja', 'Hiburan', 'Kesehatan', 'Pendidikan', 'Tagihan', 'Lainnya']
            },
            settings: {
                currency: 'IDR',
                language: 'id',
                theme: 'light'
            }
        };
        
        this.charts = {};
        this.currentPage = 'dashboard';
        
        this.init();
    }
    
    init() {
        this.loadData();
        this.setupEventListeners();
        this.initializeSampleData();
        this.hideLoadingScreen();
        this.updateDashboard();
        this.renderAllPages();
    }
    
    // Data Management
    loadData() {
        const savedData = localStorage.getItem('wwn_data');
        if (savedData) {
            this.data = { ...this.data, ...JSON.parse(savedData) };
        }
    }
    
    saveData() {
        localStorage.setItem('wwn_data', JSON.stringify(this.data));
        this.updateDashboard();
    }
    
    initializeSampleData() {
        if (this.data.transactions.length === 0) {
            // Sample Accounts
            this.data.accounts = [
                { id: 1, name: 'BCA - Tabungan', type: 'bank', balance: 25000000, icon: 'university' },
                { id: 2, name: 'Mandiri - Giro', type: 'bank', balance: 15000000, icon: 'university' },
                { id: 3, name: 'GoPay', type: 'digital', balance: 750000, icon: 'wallet' },
                { id: 4, name: 'OVO', type: 'digital', balance: 500000, icon: 'wallet' },
                { id: 5, name: 'Dompet Tunai', type: 'cash', balance: 1200000, icon: 'money-bill' }
            ];
            
            // Sample Transactions
            const today = new Date();
            this.data.transactions = [
                { id: 1, type: 'income', amount: 8000000, category: 'Gaji', description: 'Gaji Bulanan', accountId: 1, date: this.formatDate(today), status: 'completed', notes: '' },
                { id: 2, type: 'expense', amount: 500000, category: 'Makanan', description: 'Belanja Mingguan', accountId: 5, date: this.formatDate(today), status: 'completed', notes: '' },
                { id: 3, type: 'expense', amount: 150000, category: 'Transportasi', description: 'Bensin', accountId: 5, date: this.formatDate(new Date(today.getTime() - 86400000)), status: 'completed', notes: '' },
                { id: 4, type: 'expense', amount: 300000, category: 'Hiburan', description: 'Nonton Bioskop', accountId: 3, date: this.formatDate(new Date(today.getTime() - 172800000)), status: 'completed', notes: '' },
                { id: 5, type: 'income', amount: 500000, category: 'Bonus', description: 'Bonus Project', accountId: 1, date: this.formatDate(new Date(today.getTime() - 259200000)), status: 'completed', notes: '' },
                { id: 6, type: 'expense', amount: 750000, category: 'Tagihan', description: 'Listrik & Air', accountId: 1, date: this.formatDate(new Date(today.getTime() - 345600000)), status: 'pending', notes: '' },
                { id: 7, type: 'expense', amount: 200000, category: 'Kesehatan', description: 'Obat-obatan', accountId: 5, date: this.formatDate(new Date(today.getTime() - 432000000)), status: 'completed', notes: '' },
                { id: 8, type: 'income', amount: 1000000, category: 'Investasi', description: 'Dividen Saham', accountId: 1, date: this.formatDate(new Date(today.getTime() - 518400000)), status: 'completed', notes: '' }
            ];
            
            // Sample Budgets
            this.data.budgets = [
                { id: 1, category: 'Makanan', limit: 2000000, spent: 1250000 },
                { id: 2, category: 'Transportasi', limit: 500000, spent: 350000 },
                { id: 3, category: 'Hiburan', limit: 1000000, spent: 800000 },
                { id: 4, category: 'Belanja', limit: 1500000, spent: 450000 },
                { id: 5, category: 'Tagihan', limit: 1000000, spent: 750000 }
            ];
            
            // Sample Investments
            this.data.investments = [
                { id: 1, name: 'Saham BBCA', type: 'stock', amount: 50000000, currentValue: 58000000, units: 1000, avgPrice: 50000 },
                { id: 2, name: 'Saham TLKM', type: 'stock', amount: 30000000, currentValue: 32500000, units: 8000, avgPrice: 3750 },
                { id: 3, name: 'Reksadana Pasar Uang', type: 'mutual_fund', amount: 20000000, currentValue: 21200000, units: 20000, avgPrice: 1000 },
                { id: 4, name: 'Emas Antam', type: 'gold', amount: 15000000, currentValue: 17500000, units: 20, avgPrice: 750000 },
                { id: 5, name: 'Deposito BCA', type: 'deposit', amount: 50000000, currentValue: 52000000, units: 1, avgPrice: 50000000 }
            ];
            
            // Sample Debts
            this.data.debts = [
                { id: 1, type: 'debt', creditor: 'Bank BCA', amount: 50000000, remaining: 35000000, dueDate: '2025-12-31', interestRate: 12 },
                { id: 2, type: 'receivable', debtor: 'John Doe', amount: 5000000, remaining: 5000000, dueDate: '2024-06-30', interestRate: 0 }
            ];
            
            // Sample Goals
            this.data.goals = [
                { id: 1, name: 'Dana Darurat', targetAmount: 50000000, currentAmount: 25000000, deadline: '2024-12-31', icon: 'shield-alt' },
                { id: 2, name: 'Liburan ke Jepang', targetAmount: 30000000, currentAmount: 12000000, deadline: '2025-06-30', icon: 'plane' },
                { id: 3, name: 'Beli Laptop Baru', targetAmount: 20000000, currentAmount: 8000000, deadline: '2024-09-30', icon: 'laptop' },
                { id: 4, name: 'DP Rumah', targetAmount: 200000000, currentAmount: 45000000, deadline: '2026-12-31', icon: 'home' }
            ];
            
            this.saveData();
        }
    }
    
    hideLoadingScreen() {
        setTimeout(() => {
            document.getElementById('loadingScreen').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('loadingScreen').style.display = 'none';
                document.getElementById('app').style.display = 'flex';
            }, 500);
        }, 1500);
    }
    
    // Event Listeners
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                this.navigateTo(page);
            });
        });
        
        // Add Transaction Button
        document.getElementById('addTransactionBtn').addEventListener('click', () => {
            this.openModal('transactionModal');
        });
        
        // Close Modal
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModal('transactionModal');
            });
        });
        
        // Transaction Form
        document.getElementById('transactionForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTransaction();
        });
        
        // Toggle Buttons
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.updateCategoryDropdown(btn.dataset.type);
            });
        });
        
        // Notification Button
        document.getElementById('notificationBtn').addEventListener('click', () => {
            document.getElementById('notificationPanel').classList.toggle('active');
        });
        
        // Filter Buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterTransactions(btn.dataset.filter);
            });
        });
        
        // View All Links
        document.querySelectorAll('.view-all').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateTo(link.dataset.page);
            });
        });
        
        // Floating Action Buttons
        document.getElementById('addBudgetBtn')?.addEventListener('click', () => this.addBudget());
        document.getElementById('addAccountBtn')?.addEventListener('click', () => this.addAccount());
        document.getElementById('addInvestmentBtn')?.addEventListener('click', () => this.addInvestment());
        document.getElementById('addDebtBtn')?.addEventListener('click', () => this.addDebt());
        document.getElementById('addGoalBtn')?.addEventListener('click', () => this.addGoal());
        
        // AI Chat
        document.getElementById('sendChatBtn')?.addEventListener('click', () => this.sendChatMessage());
        document.getElementById('chatInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendChatMessage();
        });
        
        // Settings
        document.getElementById('exportDataBtn')?.addEventListener('click', () => this.exportData());
        document.getElementById('resetDataBtn')?.addEventListener('click', () => this.resetData());
        
        // Click outside notification panel
        document.addEventListener('click', (e) => {
            const panel = document.getElementById('notificationPanel');
            const btn = document.getElementById('notificationBtn');
            if (!panel.contains(e.target) && !btn.contains(e.target)) {
                panel.classList.remove('active');
            }
        });
    }
    
    // Navigation
    navigateTo(page) {
        this.currentPage = page;
        
        // Update nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.page === page);
        });
        
        // Update pages
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });
        document.getElementById(`${page}Page`)?.classList.add('active');
        
        // Render page content
        this.renderPage(page);
    }
    
    // Render Pages
    renderAllPages() {
        this.renderDashboard();
        this.renderTransactions();
        this.renderBudgets();
        this.renderAccounts();
        this.renderInvestments();
        this.renderDebts();
        this.renderGoals();
        this.renderReports();
        this.renderAIAdvisor();
    }
    
    renderPage(page) {
        switch(page) {
            case 'dashboard': this.renderDashboard(); break;
            case 'transactions': this.renderTransactions(); break;
            case 'budgets': this.renderBudgets(); break;
            case 'accounts': this.renderAccounts(); break;
            case 'investments': this.renderInvestments(); break;
            case 'debts': this.renderDebts(); break;
            case 'goals': this.renderGoals(); break;
            case 'reports': this.renderReports(); break;
            case 'ai-advisor': this.renderAIAdvisor(); break;
        }
    }
    
    // Dashboard
    renderDashboard() {
        this.updateDashboard();
        this.renderRecentTransactions();
        this.renderBudgetProgress();
        this.initCharts();
    }
    
    updateDashboard() {
        // Calculate totals
        const totalAssets = this.data.accounts.reduce((sum, acc) => sum + acc.balance, 0);
        const totalInvestments = this.data.investments.reduce((sum, inv) => sum + inv.currentValue, 0);
        const totalDebts = this.data.debts.filter(d => d.type === 'debt').reduce((sum, d) => sum + d.remaining, 0);
        const netWorth = totalAssets + totalInvestments - totalDebts;
        
        // Monthly income and expense
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthlyIncome = this.data.transactions
            .filter(t => t.type === 'income' && new Date(t.date) >= monthStart)
            .reduce((sum, t) => sum + t.amount, 0);
        const monthlyExpense = this.data.transactions
            .filter(t => t.type === 'expense' && new Date(t.date) >= monthStart)
            .reduce((sum, t) => sum + t.amount, 0);
        
        // Update DOM
        document.getElementById('totalNetWorth').textContent = this.formatCurrency(netWorth);
        document.getElementById('monthlyIncome').textContent = this.formatCurrency(monthlyIncome);
        document.getElementById('monthlyExpense').textContent = this.formatCurrency(monthlyExpense);
        document.getElementById('totalSavings').textContent = this.formatCurrency(totalAssets);
        document.getElementById('totalInvestments').textContent = this.formatCurrency(totalInvestments);
        
        // Budget summary
        const totalBudget = this.data.budgets.reduce((sum, b) => sum + b.limit, 0);
        const usedBudget = this.data.budgets.reduce((sum, b) => sum + b.spent, 0);
        document.getElementById('totalBudget')?.textContent = this.formatCurrency(totalBudget);
        document.getElementById('usedBudget')?.textContent = this.formatCurrency(usedBudget);
        document.getElementById('remainingBudget')?.textContent = this.formatCurrency(totalBudget - usedBudget);
        
        // Investment summary
        const totalInvested = this.data.investments.reduce((sum, i) => sum + i.amount, 0);
        const totalCurrentValue = this.data.investments.reduce((sum, i) => sum + i.currentValue, 0);
        const totalProfit = totalCurrentValue - totalInvested;
        const returnPercentage = ((totalProfit / totalInvested) * 100).toFixed(2);
        
        document.getElementById('totalInvestmentValue')?.textContent = this.formatCurrency(totalCurrentValue);
        document.getElementById('totalInvestmentProfit')?.textContent = this.formatCurrency(totalProfit);
        document.getElementById('totalInvestmentReturn')?.textContent = `${returnPercentage}%`;
        
        // Debt summary
        const totalDebt = this.data.debts.filter(d => d.type === 'debt').reduce((sum, d) => sum + d.remaining, 0);
        const totalReceivable = this.data.debts.filter(d => d.type === 'receivable').reduce((sum, d) => sum + d.remaining, 0);
        document.getElementById('totalDebt')?.textContent = this.formatCurrency(totalDebt);
        document.getElementById('totalReceivable')?.textContent = this.formatCurrency(totalReceivable);
    }
    
    renderRecentTransactions() {
        const container = document.getElementById('recentTransactions');
        const recent = this.data.transactions.slice(-5).reverse();
        
        container.innerHTML = recent.map(t => `
            <div class="transaction-item">
                <div class="transaction-icon" style="background: ${t.type === 'income' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'}; color: ${t.type === 'income' ? '#10b981' : '#ef4444'};">
                    <i class="fas fa-${t.type === 'income' ? 'arrow-down' : 'arrow-up'}"></i>
                </div>
                <div class="transaction-info">
                    <div class="description">${t.description}</div>
                    <div class="category">${t.category}</div>
                </div>
                <div class="transaction-amount ${t.type}">${t.type === 'income' ? '+' : '-'}${this.formatCurrency(t.amount)}</div>
            </div>
        `).join('');
    }
    
    renderBudgetProgress() {
        const container = document.getElementById('budgetProgress');
        
        container.innerHTML = this.data.budgets.map(b => {
            const percentage = Math.min((b.spent / b.limit) * 100, 100);
            let progressClass = 'low';
            if (percentage > 50) progressClass = 'medium';
            if (percentage > 80) progressClass = 'high';
            
            return `
                <div class="budget-item">
                    <div class="budget-header">
                        <span class="category-name">${b.category}</span>
                        <span class="percentage">${percentage.toFixed(0)}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill ${progressClass}" style="width: ${percentage}%"></div>
                    </div>
                    <div class="budget-amounts">
                        <span>${this.formatCurrency(b.spent)}</span>
                        <span>${this.formatCurrency(b.limit)}</span>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    // Transactions
    renderTransactions() {
        const tbody = document.getElementById('transactionsTableBody');
        const categoryFilter = document.getElementById('categoryFilter');
        
        // Populate category filter
        const allCategories = [...new Set([...this.data.categories.income, ...this.data.categories.expense])];
        categoryFilter.innerHTML = '<option value="">Semua Kategori</option>' + 
            allCategories.map(c => `<option value="${c}">${c}</option>`).join('');
        
        // Render table
        tbody.innerHTML = this.data.transactions.map(t => {
            const account = this.data.accounts.find(a => a.id === t.accountId);
            return `
                <tr>
                    <td>${this.formatDateDisplay(t.date)}</td>
                    <td><span class="status-badge" style="background: rgba(99, 102, 241, 0.1); color: #6366f1;">${t.category}</span></td>
                    <td>${t.description}</td>
                    <td>${account?.name || '-'}</td>
                    <td style="color: ${t.type === 'income' ? '#10b981' : '#ef4444'}; font-weight: 600;">
                        ${t.type === 'income' ? '+' : '-'}${this.formatCurrency(t.amount)}
                    </td>
                    <td><span class="status-badge ${t.status}">${t.status}</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="action-btn" onclick="wwn.editTransaction(${t.id})"><i class="fas fa-edit"></i></button>
                            <button class="action-btn delete" onclick="wwn.deleteTransaction(${t.id})"><i class="fas fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }
    
    filterTransactions(filter) {
        const tbody = document.getElementById('transactionsTableBody');
        let filtered = this.data.transactions;
        
        if (filter !== 'all') {
            filtered = filtered.filter(t => t.type === filter);
        }
        
        tbody.innerHTML = filtered.map(t => {
            const account = this.data.accounts.find(a => a.id === t.accountId);
            return `
                <tr>
                    <td>${this.formatDateDisplay(t.date)}</td>
                    <td><span class="status-badge" style="background: rgba(99, 102, 241, 0.1); color: #6366f1;">${t.category}</span></td>
                    <td>${t.description}</td>
                    <td>${account?.name || '-'}</td>
                    <td style="color: ${t.type === 'income' ? '#10b981' : '#ef4444'}; font-weight: 600;">
                        ${t.type === 'income' ? '+' : '-'}${this.formatCurrency(t.amount)}
                    </td>
                    <td><span class="status-badge ${t.status}">${t.status}</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="action-btn" onclick="wwn.editTransaction(${t.id})"><i class="fas fa-edit"></i></button>
                            <button class="action-btn delete" onclick="wwn.deleteTransaction(${t.id})"><i class="fas fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }
    
    addTransaction() {
        const type = document.querySelector('.toggle-btn.active').dataset.type;
        const amount = parseFloat(document.getElementById('transactionAmount').value);
        const category = document.getElementById('transactionCategory').value;
        const description = document.getElementById('transactionDescription').value;
        const date = document.getElementById('transactionDate').value;
        const accountId = parseInt(document.getElementById('transactionAccount').value);
        const notes = document.getElementById('transactionNotes').value;
        
        const transaction = {
            id: Date.now(),
            type,
            amount,
            category,
            description,
            date,
            accountId,
            status: 'completed',
            notes
        };
        
        this.data.transactions.push(transaction);
        
        // Update account balance
        const account = this.data.accounts.find(a => a.id === accountId);
        if (account) {
            account.balance += type === 'income' ? amount : -amount;
        }
        
        // Update budget
        if (type === 'expense') {
            const budget = this.data.budgets.find(b => b.category === category);
            if (budget) {
                budget.spent += amount;
            }
        }
        
        this.saveData();
        this.closeModal('transactionModal');
        this.renderAllPages();
        
        // Show success notification
        this.showNotification('Transaksi berhasil ditambahkan!', 'success');
    }
    
    deleteTransaction(id) {
        if (confirm('Yakin ingin menghapus transaksi ini?')) {
            this.data.transactions = this.data.transactions.filter(t => t.id !== id);
            this.saveData();
            this.renderAllPages();
        }
    }
    
    editTransaction(id) {
        // Implementation for editing transaction
        alert('Fitur edit akan segera hadir!');
    }
    
    // Budgets
    renderBudgets() {
        const container = document.getElementById('budgetCategories');
        
        container.innerHTML = this.data.budgets.map(b => {
            const percentage = Math.min((b.spent / b.limit) * 100, 100);
            const remaining = b.limit - b.spent;
            
            return `
                <div class="budget-item" style="background: var(--bg-secondary); box-shadow: var(--shadow-md);">
                    <div class="budget-header">
                        <span class="category-name">${b.category}</span>
                        <span class="percentage" style="color: ${percentage > 80 ? '#ef4444' : percentage > 50 ? '#f59e0b' : '#10b981'}">${percentage.toFixed(1)}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percentage}%; background: ${percentage > 80 ? '#ef4444' : percentage > 50 ? '#f59e0b' : '#10b981'}"></div>
                    </div>
                    <div class="budget-amounts">
                        <span>Digunakan: ${this.formatCurrency(b.spent)}</span>
                        <span>Sisa: ${this.formatCurrency(remaining)}</span>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    addBudget() {
        alert('Fitur tambah anggaran akan segera hadir!');
    }
    
    // Accounts
    renderAccounts() {
        const container = document.getElementById('accountsGrid');
        
        container.innerHTML = this.data.accounts.map(acc => `
            <div class="account-card">
                <div class="account-header">
                    <div class="account-type">
                        <div class="account-icon ${acc.type}">
                            <i class="fas fa-${acc.icon}"></i>
                        </div>
                        <span class="account-name">${acc.name}</span>
                    </div>
                </div>
                <div class="account-balance">${this.formatCurrency(acc.balance)}</div>
                <div class="account-details">
                    <span>${acc.type.toUpperCase()}</span>
                    <span>ID: ${acc.id}</span>
                </div>
            </div>
        `).join('');
    }
    
    addAccount() {
        alert('Fitur tambah akun akan segera hadir!');
    }
    
    // Investments
    renderInvestments() {
        const container = document.getElementById('investmentsList');
        
        container.innerHTML = this.data.investments.map(inv => {
            const profit = inv.currentValue - inv.amount;
            const profitPercent = ((profit / inv.amount) * 100).toFixed(2);
            
            return `
                <div class="transaction-item" style="display: block;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <div>
                            <div class="description">${inv.name}</div>
                            <div class="category">${inv.type.toUpperCase()}</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 1.25rem; font-weight: 700;">${this.formatCurrency(inv.currentValue)}</div>
                            <div style="color: ${profit >= 0 ? '#10b981' : '#ef4444'}; font-size: 0.875rem;">
                                ${profit >= 0 ? '+' : ''}${this.formatCurrency(profit)} (${profitPercent}%)
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 1rem; font-size: 0.875rem; color: var(--text-secondary);">
                        <span>Modal: ${this.formatCurrency(inv.amount)}</span>
                        <span>${inv.units} unit @ ${this.formatCurrency(inv.avgPrice)}</span>
                    </div>
                </div>
            `;
        }).join('');
        
        this.renderPortfolioChart();
    }
    
    addInvestment() {
        alert('Fitur tambah investasi akan segera hadir!');
    }
    
    renderPortfolioChart() {
        const ctx = document.getElementById('portfolioChart');
        if (!ctx) return;
        
        if (this.charts.portfolio) {
            this.charts.portfolio.destroy();
        }
        
        const labels = this.data.investments.map(i => i.name);
        const data = this.data.investments.map(i => i.currentValue);
        const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'];
        
        this.charts.portfolio = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: colors.slice(0, data.length),
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Debts
    renderDebts() {
        const container = document.getElementById('debtsList');
        
        container.innerHTML = this.data.debts.map(d => `
            <div class="transaction-item" style="display: block;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div class="description">${d.type === 'debt' ? d.creditor : d.debtor}</div>
                        <div class="category">${d.type === 'debt' ? 'Utang' : 'Piutang'} • Bunga: ${d.interestRate}%</div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 1.25rem; font-weight: 700; color: ${d.type === 'debt' ? '#ef4444' : '#10b981'}">
                            ${this.formatCurrency(d.remaining)}
                        </div>
                        <div style="font-size: 0.875rem; color: var(--text-secondary);">
                            Jatuh tempo: ${this.formatDateDisplay(d.dueDate)}
                        </div>
                    </div>
                </div>
                <div style="margin-top: 1rem;">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(d.remaining / d.amount) * 100}%; background: ${d.type === 'debt' ? '#ef4444' : '#10b981'}"></div>
                    </div>
                    <div style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.5rem;">
                        Sisa: ${this.formatCurrency(d.remaining)} dari ${this.formatCurrency(d.amount)}
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    addDebt() {
        alert('Fitur tambah utang/piutang akan segera hadir!');
    }
    
    // Goals
    renderGoals() {
        const container = document.getElementById('goalsGrid');
        
        container.innerHTML = this.data.goals.map(g => {
            const percentage = ((g.currentAmount / g.targetAmount) * 100).toFixed(1);
            
            return `
                <div class="account-card">
                    <div class="account-header">
                        <div class="account-type">
                            <div class="account-icon" style="background: rgba(99, 102, 241, 0.1); color: #6366f1;">
                                <i class="fas fa-${g.icon}"></i>
                            </div>
                            <span class="account-name">${g.name}</span>
                        </div>
                    </div>
                    <div class="account-balance" style="font-size: 1.5rem;">${this.formatCurrency(g.currentAmount)}</div>
                    <div class="progress-bar" style="margin: 1rem 0;">
                        <div class="progress-fill" style="width: ${percentage}%; background: linear-gradient(90deg, #6366f1, #818cf8)"></div>
                    </div>
                    <div class="account-details">
                        <span>${percentage}% tercapai</span>
                        <span>Target: ${this.formatCurrency(g.targetAmount)}</span>
                    </div>
                    <div style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.75rem;">
                        <i class="fas fa-calendar"></i> Deadline: ${this.formatDateDisplay(g.deadline)}
                    </div>
                </div>
            `;
        }).join('');
    }
    
    addGoal() {
        alert('Fitur tambah target akan segera hadir!');
    }
    
    // Reports
    renderReports() {
        const container = document.getElementById('reportContent');
        const reportType = document.getElementById('reportType').value;
        
        // Generate report based on type
        container.innerHTML = `
            <div style="padding: 2rem; text-align: center;">
                <i class="fas fa-file-invoice" style="font-size: 4rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
                <h3>Laporan ${reportType.replace('-', ' ').toUpperCase()}</h3>
                <p style="color: var(--text-secondary); margin: 1rem 0;">Fitur laporan lengkap akan segera hadir dengan export PDF dan Excel</p>
            </div>
        `;
    }
    
    // AI Advisor
    renderAIAdvisor() {
        const container = document.getElementById('aiInsights');
        
        // Generate AI insights based on user data
        const monthlyExpense = this.data.transactions
            .filter(t => t.type === 'expense' && new Date(t.date) >= new Date(new Date().getFullYear(), new Date().getMonth(), 1))
            .reduce((sum, t) => sum + t.amount, 0);
        
        const monthlyIncome = this.data.transactions
            .filter(t => t.type === 'income' && new Date(t.date) >= new Date(new Date().getFullYear(), new Date().getMonth(), 1))
            .reduce((sum, t) => sum + t.amount, 0);
        
        const savingsRate = ((monthlyIncome - monthlyExpense) / monthlyIncome * 100).toFixed(1);
        
        const insights = [
            {
                title: '💡 Rasio Tabungan Sehat',
                content: `Rasio tabungan Anda bulan ini adalah ${savingsRate}%. Target ideal adalah minimal 20% dari pendapatan.`
            },
            {
                title: '📊 Pola Pengeluaran',
                content: 'Kategori pengeluaran terbesar Anda adalah Makanan. Pertimbangkan untuk membuat meal planning untuk menghemat.'
            },
            {
                title: '🎯 Progress Target',
                content: `Anda telah mencapai ${this.data.goals.reduce((sum, g) => sum + (g.currentAmount / g.targetAmount), 0) / this.data.goals.length * 100 | 0}% rata-rata dari semua target keuangan Anda.`
            },
            {
                title: '⚠️ Peringatan Anggaran',
                content: this.data.budgets.filter(b => (b.spent / b.limit) > 0.8).length > 0 
                    ? 'Beberapa kategori anggaran Anda sudah melebihi 80%. Harap berhati-hati dalam pengeluaran!'
                    : 'Anggaran Anda masih dalam kondisi aman. Pertahankan!'
            }
        ];
        
        container.innerHTML = insights.map(i => `
            <div class="insight-card">
                <h4>${i.title}</h4>
                <p>${i.content}</p>
            </div>
        `).join('');
    }
    
    sendChatMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML += `
            <div class="message user">
                <div class="message-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="message-content">
                    <p>${message}</p>
                </div>
            </div>
        `;
        
        input.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const responses = [
                'Berdasarkan analisis data keuangan Anda, saya merekomendasikan untuk meningkatkan alokasi dana darurat minimal 6x pengeluaran bulanan.',
                'Pola pengeluaran Anda menunjukkan bahwa kategori hiburan cukup tinggi. Mungkin bisa dikurangi untuk mempercepat pencapaian target keuangan.',
                'Portofolio investasi Anda sudah cukup terdiversifikasi. Pertahankan dan pertimbangkan untuk rebalancing setiap 6 bulan.',
                'Cash flow Anda positif bulan ini. Bagus! Sisihkan minimal 20% untuk investasi jangka panjang.',
                'Saya注意到 Anda memiliki beberapa target keuangan. Prioritaskan dana darurat terlebih dahulu sebelum target lainnya.'
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            
            chatMessages.innerHTML += `
                <div class="message ai">
                    <div class="message-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="message-content">
                        <p>${randomResponse}</p>
                    </div>
                </div>
            `;
            
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
    
    // Charts
    initCharts() {
        this.initCashFlowChart();
        this.initExpenseCategoryChart();
        this.initNetWorthChart();
    }
    
    initCashFlowChart() {
        const ctx = document.getElementById('cashFlowChart');
        if (!ctx) return;
        
        if (this.charts.cashFlow) {
            this.charts.cashFlow.destroy();
        }
        
        // Get last 7 days data
        const labels = [];
        const incomeData = [];
        const expenseData = [];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = this.formatDate(date);
            
            labels.push(date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }));
            
            const dayIncome = this.data.transactions
                .filter(t => t.type === 'income' && t.date === dateStr)
                .reduce((sum, t) => sum + t.amount, 0);
            
            const dayExpense = this.data.transactions
                .filter(t => t.type === 'expense' && t.date === dateStr)
                .reduce((sum, t) => sum + t.amount, 0);
            
            incomeData.push(dayIncome);
            expenseData.push(dayExpense);
        }
        
        this.charts.cashFlow = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Pemasukan',
                        data: incomeData,
                        backgroundColor: '#10b981',
                        borderRadius: 8
                    },
                    {
                        label: 'Pengeluaran',
                        data: expenseData,
                        backgroundColor: '#ef4444',
                        borderRadius: 8
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    initExpenseCategoryChart() {
        const ctx = document.getElementById('expenseCategoryChart');
        if (!ctx) return;
        
        if (this.charts.expenseCategory) {
            this.charts.expenseCategory.destroy();
        }
        
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        
        const categoryTotals = {};
        this.data.transactions
            .filter(t => t.type === 'expense' && new Date(t.date) >= monthStart)
            .forEach(t => {
                categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
            });
        
        const labels = Object.keys(categoryTotals);
        const data = Object.values(categoryTotals);
        const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6'];
        
        this.charts.expenseCategory = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: colors.slice(0, data.length),
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }
    
    initNetWorthChart() {
        const ctx = document.getElementById('netWorthChart');
        if (!ctx) return;
        
        if (this.charts.netWorth) {
            this.charts.netWorth.destroy();
        }
        
        this.charts.netWorth = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
                datasets: [{
                    label: 'Kekayaan Bersih',
                    data: [45000000, 52000000, 58000000, 65000000, 72000000, 80000000],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false
                    }
                }
            }
        });
    }
    
    // Modal
    openModal(modalId) {
        document.getElementById(modalId).classList.add('active');
        this.populateModalForms();
    }
    
    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    }
    
    populateModalForms() {
        // Populate category dropdown
        const type = document.querySelector('.toggle-btn.active').dataset.type;
        this.updateCategoryDropdown(type);
        
        // Populate account dropdown
        const accountSelect = document.getElementById('transactionAccount');
        accountSelect.innerHTML = this.data.accounts.map(a => 
            `<option value="${a.id}">${a.name} - ${this.formatCurrency(a.balance)}</option>`
        ).join('');
        
        // Set default date
        document.getElementById('transactionDate').value = this.formatDate(new Date());
    }
    
    updateCategoryDropdown(type) {
        const categorySelect = document.getElementById('transactionCategory');
        const categories = this.data.categories[type];
        categorySelect.innerHTML = categories.map(c => `<option value="${c}">${c}</option>`).join('');
    }
    
    // Notifications
    showNotification(message, type = 'info') {
        const notifications = [
            {
                icon: type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle',
                iconClass: type === 'success' ? 'success' : type === 'warning' ? 'warning' : 'info',
                title: type === 'success' ? 'Berhasil' : type === 'warning' ? 'Peringatan' : 'Info',
                message,
                time: 'Baru saja'
            }
        ];
        
        const list = document.getElementById('notificationList');
        list.innerHTML = notifications.map(n => `
            <div class="notification-item">
                <div class="notification-icon ${n.iconClass}">
                    <i class="fas fa-${n.icon}"></i>
                </div>
                <div class="notification-content">
                    <div class="title">${n.title}</div>
                    <div class="message">${n.message}</div>
                    <div class="notification-time">${n.time}</div>
                </div>
            </div>
        `).join('');
    }
    
    // Utilities
    formatCurrency(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
    
    formatDate(date) {
        return date.toISOString().split('T')[0];
    }
    
    formatDateDisplay(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }
    
    exportData() {
        const dataStr = JSON.stringify(this.data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `wwn_backup_${this.formatDate(new Date())}.json`;
        a.click();
        URL.revokeObjectURL(url);
        this.showNotification('Data berhasil diexport!', 'success');
    }
    
    resetData() {
        if (confirm('PERINGATAN: Ini akan menghapus semua data Anda. Yakin ingin melanjutkan?')) {
            localStorage.removeItem('wwn_data');
            location.reload();
        }
    }
}

// Initialize App
let wwn;
document.addEventListener('DOMContentLoaded', () => {
    wwn = new WWNApp();
});
