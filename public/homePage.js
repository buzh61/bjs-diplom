// Выход
const logout = new LogoutButton();

logout.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    })
}

// Профиль
ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
})

// Курс валют
const rates = new RatesBoard();

stocks = () => ApiConnector.getStocks(response => {
    if (response.success) {
        rates.clearTable();
        return rates.fillTable(response.data);
    }
});

stocks();
setInterval(stocks, 60000);

// Пополнение кошелька
const money = new MoneyManager();

money.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            console.log(response)
            ProfileWidget.showProfile(response.data);
            money.setMessage(response.success, "Кошелёк успешно пополнен")
        } else {
            console.log(response)
            money.setMessage(response.success, response.error)
        }
    })
}

// Конвертация валюты
money.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(response.success, "Валюта успешно конвертирована")
        } else {
            money.setMessage(response.success, response.error)
        }
    })
}

// Перевод валюты
money.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(response.success, "Валюта успешно переведена")
        } else {
            money.setMessage(response.success, response.error)
        }
    })
}

// Избранное
const users = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success) {
        console.log(response)
        users.clearTable();
        users.fillTable(response.data)
        money.updateUsersList(response.data)
    }
})

users.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            users.clearTable();
            users.fillTable(response.data)
            money.updateUsersList(response.data)
            users.setMessage(response.success, "Пользователь добавлен")
        } else {
            users.setMessage(response.success, response.error)
        }
    })
}

users.removeUserCallback  = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            users.clearTable();
            users.fillTable(response.data)
            money.updateUsersList(response.data)
            users.setMessage(response.success, "Пользователь удалён")
        } else {
            users.setMessage(response.success, response.error)
        }
    })
}