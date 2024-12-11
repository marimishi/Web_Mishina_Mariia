if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    const data = {
        name: 'Каталог товаров',
        hasChildren: true,
        items: [
            {
                name: 'Мойки',
                hasChildren: true,
                items: [
                    {
                        name: 'Ulgran1',
                        hasChildren: true,
                        items: [
                            {
                                name: 'SMT1',
                                hasChildren: false,
                                items: []
                            },
                            {
                                name: 'SMT2',
                                hasChildren: false,
                                items: []
                            }
                        ]
                    },
                    {
                        name: 'Ulgran2',
                        hasChildren: true,
                        items: [
                            {
                                name: 'SMT3',
                                hasChildren: false,
                                items: []
                            },
                            {
                                name: 'SMT4',
                                hasChildren: false,
                                items: []
                            }
                        ]
                    }
                ]
            }, {
                name: 'Фильтры',
                hasChildren: true,
                items: [
                    {
                        name: 'Ulgran3',
                        hasChildren: true,
                        items: [
                            {
                                name: 'SMT5',
                                hasChildren: false,
                                items: []
                            },
                            {
                                name: 'SMT6',
                                hasChildren: false,
                                items: []
                            }
                        ]
                    }
                ]
            }
        ]
    };

    const items = new ListItems(document.getElementById('list-items'), data);

    items.render();
    items.init();

    function ListItems(el, data) {
        this.el = el;
        this.data = data;

        this.init = function () {
            const parents = this.el.querySelectorAll('[data-parent]');

            parents.forEach(parent => {
                const open = parent.querySelector('[data-open]');

                if (open) {
                    open.addEventListener('click', () => this.toggleItems(parent));
                }
            });
        };

        this.render = function () {
            this.el.innerHTML = this.renderParent(this.data);
        };

        this.renderParent = function (data) {
            return `
                <div class="list-item" data-parent>
                    <div class="list-item__inner">
                        <img class="list-item__arrow" src="img/chevron-down.png" alt="chevron-down" data-open>
                        <img class="list-item__folder" src="img/folder.png" alt="folder">
                        <span>${data.name}</span>
                    </div>
                    ${data.hasChildren ? `<div class="list-item__items">${data.items.map(this.renderParent.bind(this)).join('')}</div>` : ''}
                </div>
            `;
        };

        this.renderChildren = function (data) {
            return `
                <div class="list-item">
                    <div class="list-item__inner">
                        <img class="list-item__folder" src="img/folder.png" alt="folder">
                        <span>${data.name}</span>
                    </div>
                </div>
            `;
        };

        this.toggleItems = function (parent) {
            const items = parent.querySelector('.list-item__items');

            if (items) {
                items.classList.toggle('hidden');
            }

            const arrow = parent.querySelector('.list-item__arrow');
            if (arrow) {
                arrow.classList.toggle('rotated');
            }
        };
    }
}