// Выход
const logout = new LogoutButton();

logout.action = () => {
    ApiConnector.logout(response => {
        if (response.success === true) {
            location.reload();
        } else {
            errorMessage = response.error;
            userForm.setLoginErrorMessage(errorMessage);
        }
    })
}

// Профиль
ApiConnector.current(response => {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
    }
})

// Курс валют
const rates = new RatesBoard();

stocks = () => ApiConnector.getStocks(response => {
    if (response.success === true) {
        rates.clearTable();
        return rates.fillTable(response.data);
    }
});

stocks();
setInterval(() => stocks(), 60000);

// Пополнение кошелька
const money = new MoneyManager();

money.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(response.success, "Кошелёк успешно пополнен")
        } else {
            money.setMessage(response.success, "Не удалось пополнить кошелёк")
        }
    })
}

// Конвертация валюты
money.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(response.success, "Валюта успешно конвертирована")
        } else {
            money.setMessage(response.success, "Ошибка конвертирования валюты")
        }
    })
}

// Перевод валюты
money.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(response.success, "Валюта успешно переведена")
        } else {
            money.setMessage(response.success, "Ошибка перевода валюты")
        }
    })
}

// Избранное
const users = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success === true) {
        console.log(response)
        users.clearTable();
        users.fillTable(response.data)
        money.updateUsersList(response.data)
    }
})

users.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success === true) {
            users.clearTable();
            users.fillTable(response.data)
            money.updateUsersList(response.data)
            users.setMessage(response.success, "Пользователь добавлен")
        } else {
            users.setMessage(response.success, "Ошибка добавления пользователя")
        }
    })
}

users.removeUserCallback  = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success === true) {
            users.clearTable();
            users.fillTable(response.data)
            money.updateUsersList(response.data)
            users.setMessage(response.success, "Пользователь удалён")
        } else {
            users.setMessage(response.success, "Ошибка удаления пользователя")
        }
    })
}