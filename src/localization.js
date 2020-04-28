import LocalizedStrings from 'react-localization';
import { getLocalStorage } from './Cookie';

export let strings = new LocalizedStrings({
    en: {
        //Participant log in
        logIn: "Log in",
        groupID: "Group ID",
        SUBMIT: "SUBMIT",
        signInAsOwner: "Sign in as a group owner",
        correctEmailPasswd: "Make sure you entered the email or password correctly",
        loggedIn: "You are logged in as ",
        //Group owner sign in
        signIn: "Sign In",
        eMail: "E-mail",
        passwd: "Password",
        SIGN_IN: "SIGN IN",
        forgotPasswd: "Forgot password?",
        noGroupCreaterAcc: "Don't have a group-creater account?",
        signInAsParticipant: "Sign in as Participant",
        //Group owner sigh up
        sighUp: "SIGN UP",
        SIGN_UP: "SIGN UP",
        repeatPasswd: "Repeat your password",
        longerName: "Your name must be longer than 3 characters",
        correctEmail: "Check whether your E-mail is correct",
        registeredEmail: "This E-mail has been already registered",
        completeRegistr: "Registration completed successfully!",
        //Group owner page (left side)
        myGroups: "My groups",
        pendQuests: "Pending quests",
        settings: "Settings",
        help: "Help",
        helpPage: "Help Page",
        logOut: "Log out",
        //My groups
        noGroups: "You have no groups yet",
        yourGroups: "Your Groups:",
        editMenu: "Edit",
        deleteMenu: "Delete",
        groupEdit: "Group Editing",
        enterGroupName: "Enter a name of your group",
        groupName: "Group Name",
        longerGroupName: "Group name must be longer than 3 characters",
        resetAvatar: "Avatar has been updated successfully! You may need to refresh the page",
        CANCEL: "CANCEL",
        SAVE: "SAVE",
        createNewGroup: "CREATE NEW GROUP",
        newGroupCreate: "Creating a new group",
        CREATE: "CREATE",
        //Group owner page (right side)
        members: "MEMBERS",
        quests_owner: "QUESTS",
        leaderboard: "LEADERBOARD",
        chooseGroup: "Choose a group",
        noMembers: "You have no members yet",
        noNotifications: "You have no unread notifications",
        //Add member
        addMember: "Add Member",
        name: "Name",
        ADD: "ADD",
        //Delete member
        deleteMember: "Delete Member",
        doUWantToDelete: "Do you want to delete {0} from this group?",
        DELETE: "DELETE",
        //Quests
        quest: "Subquest ",
        description: "Description: ",
        expectAnswer: "Expected answer: ",
        addNewSubquest: "ADD NEW SUBQUEST",
        addSubquest: "Add Subquest",
        //Edit quest
        noQuests: "You have no quests yet",
        editQuest: "Edit Quest",
        title: "Title",
        EDIT: "EDIT",
        //Edit subquest
        editSubquest: "Edit Subquest",
        typeOfVarification: "Choose type of varification",
        type: "Type",
        none: "None",
        text: "Text",
        image: "Image",
        enterDescription: "Enter description",
        deleteSubquest: "Delete Subquest",
        doUWantToDeleteSub: "Do you want to delete this subquest {0}?",
        //Create quest
        createNewQuest: "Creating a new quest",
        enterTitle: "Enter a title",
        enterPoints: "Enter the number of points for the quest",
        points: "Points",
        //Delete quest
        deleteQuest: "Delete Quest",
        doUWantToDeleteQuest: "Do you want to delete quest {0}?",
        //Pending quests
        memberAnswer: "Member's answer: ",
        CONFIRM: "CONFIRM",
        noPendingQuests: "You have no pending quests yet",
        //Settings
        accSettings: "Account Settings",
        changeAvatar: "CHANGE AVATAR",
        newPasswd: "New Password",
        repeatNewPasswd: "Repeat new password",
        generalSettings: "General Settings",
        language: "Language",
        SAVE_CHANGES: "SAVE CHANGES",
        avatarError: "Avatar loading error",
        //Settings (code)
        sessionTimeout: "Session timeout. Please, log in again",
        nameReset: "Your name has been reset successfully!",
        longerPasswd: "Password must be longer than 5 characters",
        passwdMissmatch: "The new password and confirmation password do not match",
        resetPasswd: "Your password has been reset successfully!",
        //Password confirm
        passwdError: "Password was entered incorrectly",
        authorizationError: "Changes processing error",
        resetData: "Your data has been reset successfully!",
        confirmation: "Confirmation",
        changeEmail: "To change E-mail you should enter your password",
        //No match
        notFound: "404...Page Not Found",
        homePage: "Go to Home Page",
        //Participant page (left side)
        me: "Me",
        quests_participant: "Quests",
        group: "Group",
        profile: "Profile",
        myAccount: "My Account",
        messages: "Messages",
        notifications: "Notifications",
        //Me 
        DELETE_MY_ACCOUNT: "DELETE MY ACCOUNT",
        changeAvatar_Me: "You can change your avatar in Settings not here",
        changeEmail_Me: "You can change your E-mail in Settings not here",
        changeName_Me: "You can change your name in Settings not here",
        changeGroup_Me: "You cannot change your group even in Settings",
        //Quests 
        progress: "Progress: ",
        subquest: "Subquest",
        answer: "Answer",
        LOG_OUT: "LOG OUT",
        //Answer
        smthWrong: "Something went wrong...",
        answerProcess: "Your answer is being processed",
        alreadySentAnswer: "You have already sent the answer",
        sendAnswer: "Send the answer",
        sendPhoto: "Send the photo",
        COMPLETED_SUBQUEST_OWNER_NOTIFICATION: '{0} completed subquest {1}',
        COMPLETED_QUEST_OWNER_NOTIFICATION: '{0} completed quest {1}',
        SENT_ANSWER_NOTIFICATION: '{0} submitted answer for subquest {1}'
    },
    ru: {
        logIn: "Авторизация",
        groupID: "ID группы",
        SUBMIT: "ПОДТВЕРДИТЬ",
        signInAsOwner: "Войти как владелец группы",
        correctEmailPasswd: "Убедитесь, что Вы правильно ввели почту или пароль",
        loggedIn: "Вы вошли как ",
        signIn: "Вход",
        eMail: "Почта",
        passwd: "Пароль",
        SIGN_IN: "ВОЙТИ",
        forgotPasswd: "Забыли пароль?",
        noGroupCreaterAcc: "У Вас нету учетной записи создателя группы?",
        signInAsParticipant: "Войти как участник",
        sighUp: "РЕГИСТРАЦИЯ",
        SIGN_UP: "ЗАРЕГИСТРИРОВАТЬСЯ",
        repeatPasswd: "Повторите Ваш пароль",
        longerName: "Имя должно быть длинее 3 символов",
        correctEmail: "Проверьте правильность Вашей почты",
        registeredEmail: "Данная почта уже зарегистрирована",
        completeRegistr: "Регистрация успешно завершена!",
        myGroups: "Мои группы",
        pendQuests: "Квесты, ожидающие подтверждения",
        settings: "Настройки",
        help: "Помощь",
        helpPage: "Справка",
        logOut: "Выход",
        noGroups: "У Вас пока нету групп",
        yourGroups: "Ваши группы:",
        editMenu: "Редактировать",
        deleteMenu: "Удалить",
        groupEdit: "Редактирование группы",
        enterGroupName: "Введите название группы",
        groupName: "Название группы",
        longerGroupName: "Название группы должно быть длинее 3 символов",
        resetAvatar: "Фото успешно обновлено! Может понадобиться обновление страницы",
        CANCEL: "ОТМЕНИТЬ",
        SAVE: "СОХРАНИТЬ",
        createNewGroup: "СОЗДАТЬ НОВУЮ ГРУППУ",
        newGroupCreate: "Создание новой группы",
        CREATE: "СОЗДАТЬ",
        members: "УЧАСТНИКИ",
        quests_owner: "КВЕСТЫ",
        leaderboard: "ТАБЛИЦА ЛИДЕРОВ",
        chooseGroup: "Выберите группу",
        noMembers: "У Вас ещё нет участников",
        noNotifications: "У Вас нету непрочитанных уведомлений",
        addMember: "Добавление участника",
        name: "Имя",
        ADD: "ДОБАВИТЬ",
        deleteMember: "Удаление участника",
        doUWantToDelete: "Вы уверенны, что хотите удалить участника {0} из этой группы?",
        DELETE: "УДАЛИТЬ",
        quest: "Подквест ",
        description: "Описание: ",
        expectAnswer: "Ожидаемый ответ: ",
        addNewSubquest: "ДОБАВИТЬ НОВЫЙ ПОДКВЕСТ",
        addSubquest: "Добавление подквеста",
        noQuests: "У Вас пока нету квестов",
        editQuest: "Редактирование квеста",
        title: "Название",
        EDIT: "РЕДАКТИРОВАТЬ",
        editSubquest: "Редактирование подквеста",
        typeOfVarification: "Способ подтверждения",
        type: "Тип",
        none: "Ничего",
        text: "Текст",
        image: "Картинка",
        enterDescription: "Введите описание подквеста",
        deleteSubquest: "Удаление подквеста",
        doUWantToDeleteSub: "Вы уверенны, что хотите удалить этот подквест {0}?",
        createNewQuest: "Создание нового квеста",
        enterTitle: "Введите название квеста",
        enterPoints: "Введите количество очков за квест",
        points: "Очки",
        deleteQuest: "Удаление квеста",
        doUWantToDeleteQuest: "Вы уверены, что хотите удалить квест {0}?",
        memberAnswer: "Ответ участника: ",
        CONFIRM: "ПОДТВЕРДИТЬ",
        noPendingQuests: "У Вас ещё нету квестов, которые ожидают ответа",
        accSettings: "Настройки учётной записи",
        changeAvatar: "ИЗМЕНИТЬ ФОТО",
        newPasswd: "Новый пароль",
        repeatNewPasswd: "Введите новый пароль ещё раз",
        generalSettings: "Общие настройки",
        language: "Язык",
        SAVE_CHANGES: "СОХРАНИТЬ ИЗМЕНЕНИЯ",
        avatarError: "Ошибка загрузки фото",
        sessionTimeout: "Время сессии истекло. Пожалуйста, войдите заново",
        nameReset: "Ваше имя было успешно изменено!",
        longerPasswd: "Пароль должен быть длиннее 5 символов",
        passwdMissmatch: "Пароли не совпадают",
        resetPasswd: "Пароль был успешно изменен!",
        passwdError: "Пароль введен неправильно",
        authorizationError: "Ошибка обработки изменений",
        resetData: "Ваши данные были успешно изменены!",
        confirmation: "Подтверждение",
        changeEmail: "Чтобы сменить почту, Вам необходимо ввести пароль",
        notFound: "404...Эта страница не найдена",
        homePage: "Перейти на главную страницу",
        me: "Я",
        quests_participant: "Квесты",
        group: "Группа",
        profile: "Профиль",
        myAccount: "Мой аккаунт",
        messages: "Сообщения",
        notifications: "Уведомления",
        DELETE_MY_ACCOUNT: "УДАЛИТЬ УЧЁТНУЮ ЗАПИСЬ",
        changeAvatar_Me: "Изменить фото можно в Настройках. Здесь нельзя",
        changeEmail_Me: "Изменить почту можно в Настройках. Здесь нельзя",
        changeName_Me: "Изменить имя можно в Настройках. Здесь нельзя",
        changeGroup_Me: "Изменить свою группу нельзя даже в Настройках",
        progress: "Прогресс: ",
        subquest: "Подквест",
        answer: "Ответ",
        LOG_OUT: "Выход",
        smthWrong: "Что-то не так...",
        answerProcess: "Ваш ответ отправился на обработку",
        alreadySentAnswer: "Вы уже отправили ответ",
        sendAnswer: "Отправить ответ",
        sendPhoto: "Отправить фотографию",
        COMPLETED_SUBQUEST_OWNER_NOTIFICATION: '{0} выполнил подквест {1}',
        COMPLETED_QUEST_OWNER_NOTIFICATION: '{0} завершил квест {1}',
        SENT_ANSWER_NOTIFICATION: '{0} прислал ответ на подквест {1}'
    },
    ua: {
        logIn: "Авторизація",
        groupID: "ID групи",
        SUBMIT: "ПІДТВЕРДИТИ",
        signInAsOwner: "Увійти як власник групи",
        correctEmailPasswd: "Переконайтесь, що Ви правильно ввели пошту або пароль",
        loggedIn: "Ви увійшли як ",
        signIn: "Вхід",
        eMail: "Пошта",
        passwd: "Пароль",
        SIGN_IN: "УВІЙТИ",
        forgotPasswd: "Забули пароль?",
        noGroupCreaterAcc: "У Вас немає облікового запису творця групи?",
        signInAsParticipant: "Увійти як учасник",
        sighUp: "РЕЄСТРАЦІЯ",
        SIGN_UP: "ЗАРЕЄСТРУВАТИСЬ",
        repeatPasswd: "Повторіть Ваш пароль",
        longerName: "Ім'я повинно бути довшим 3 символів",
        correctEmail: "Перевірте правильність Вашої пошти",
        registeredEmail: "Дана пошта вже зареєстрована",
        completeRegistr: "Реєстрація успішно завершена!",
        myGroups: "Мої групи",
        pendQuests: "Квести, що очікують на підтвердження",
        settings: "Налаштування",
        help: "Допомога",
        helpPage: "Справка",
        logOut: "Вихід",
        noGroups: "У Вас пока немає груп",
        yourGroups: "Ваші групи:",
        editMenu: "Редагувати",
        deleteMenu: "Видалити",
        groupEdit: "Редагування групи",
        enterGroupName: "Введіть назву групи",
        groupName: "Назва групи",
        longerGroupName: "Назва групи повинна бути довшою 3 символів",
        resetAvatar: "Фото успішно оновлене! Може знадобитись обновлення сторінки",
        CANCEL: "ВІДМІНИТИ",
        SAVE: "ЗБЕРЕГТИ",
        createNewGroup: "СТВОРИТИ НОВУ ГРУПУ",
        newGroupCreate: "Створення нової групи",
        CREATE: "СТВОРИТИ",
        members: "УЧАСНИКИ",
        quests_owner: "КВЕСТИ",
        leaderboard: "ТАБЛИЦЯ ЛІДЕРІВ",
        chooseGroup: "Виберіть групу",
        noMembers: "У Вас поки немає учасників",
        noNotifications: "У Вас немає непрочитаних сповіщень",
        addMember: "Додавання учасника",
        name: "Ім'я",
        ADD: "ДОДАТИ",
        deleteMember: "Видалення учасника",
        doUWantToDelete: "Ви впевнені, що хочете видалити учасника {0} із цієї групи?",
        DELETE: "ВИДАЛИТИ",
        quest: "Подквест ",
        description: "Опис: ",
        expectAnswer: "Очікувана відповідь: ",
        addNewSubquest: "ДОДАТИ НОВИЙ ПІДКВЕСТ",
        addSubquest: "Додавання підквеста",
        noQuests: "У Вас поки немає квестів",
        editQuest: "Редагування квеста",
        title: "Назва",
        EDIT: "РЕДАГУВАТИ",
        editSubquest: "Редагування підквеста",
        typeOfVarification: "Спосіб підтверджения",
        type: "Тип",
        none: "Нічого",
        text: "Текст",
        image: "Картинка",
        enterDescription: "Введіть опис підквеста",
        deleteSubquest: "Видалення підквеста",
        doUWantToDeleteSub: "Ви впевнені, що хочете видалити цей підквест {0}?",
        createNewQuest: "Створення нового квеста",
        enterTitle: "Введіть назву квеста",
        enterPoints: "Введіть кількість балів за квест",
        points: "Бали",
        deleteQuest: "Видалення квеста",
        doUWantToDeleteQuest: "Ви впевнені, що хочите видалити квест {0}?",
        memberAnswer: "Відповідь учасника: ",
        CONFIRM: "ПІДТВЕРДИТИ",
        noPendingQuests: "У Вас ще немає квестів, які очікують на відповідь",
        accSettings: "Налаштування облікового запису",
        changeAvatar: "ЗМІНИТИ ФОТО",
        newPasswd: "Новий пароль",
        repeatNewPasswd: "Введіть новий пароль ще раз",
        generalSettings: "Загальні налаштування",
        language: "Мова",
        SAVE_CHANGES: "ЗБЕРЕГТИ ЗМІНИ",
        avatarError: "Помилка завантаження фото",
        sessionTimeout: "Час сесії вичерпано. Будь ласка, увійдіть знову",
        nameReset: "Ваше ім'я було успішно змінене!",
        longerPasswd: "Пароль повинен бути довшим 5 символів",
        passwdMissmatch: "Паролі не співпадають",
        resetPasswd: "Пароль був успішно змінений!",
        passwdError: "Пароль введений неправильно",
        authorizationError: "Помилка обробки змін",
        resetData: "Ваші дані були успішно змінені!",
        confirmation: "Підтвердження",
        changeEmail: "Щоб змінити пошту, Вам необхідно ввести пароль",
        notFound: "404... Ця сторінка не знайдена",
        homePage: "Перейти на головну сторінку",
        me: "Я",
        quests_participant: "Квести",
        group: "Група",
        profile: "Профіль",
        myAccount: "Мій акаунт",
        messages: "Повідомлення",
        notifications: "Сповіщення",
        DELETE_MY_ACCOUNT: "ВИДАЛИТИ ОБЛІКОВИЙ ЗАПИС",
        changeAvatar_Me: "Змінити фото можна в Налаштуваннях, не тут",
        changeEmail_Me: "Змінити пошту можна в Налаштуваннях, не тут",
        changeName_Me: "Змінити ім'я можна в Налаштуваннях, не тут",
        changeGroup_Me: "Змінити свою групу не можна навіть в Налаштуваннях",
        progress: "Прогрес: ",
        subquest: "Підквест",
        answer: "Відповідь",
        LOG_OUT: "Вихід",
        smthWrong: "Щось не так...",
        answerProcess: "Ваша відповідь відправилась на обробку",
        alreadySentAnswer: "Ви вже відправили відповідь",
        sendAnswer: "Відправити відповідь",
        sendPhoto: "Відправити світлину",
        COMPLETED_SUBQUEST_OWNER_NOTIFICATION: '{0} виконав підквест {1}',
        COMPLETED_QUEST_OWNER_NOTIFICATION: '{0} завершив квест {1}',
        SENT_ANSWER_NOTIFICATION: '{0} відправив відповідь на підквест {1}'
    }
});

function getCustomLang() {
    return getLocalStorage('lang') || navigator.language;
}