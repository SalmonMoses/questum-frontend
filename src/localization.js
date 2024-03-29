import LocalizedStrings from 'react-localization';
import { getLocalStorage } from './Cookie';

export let strings = new LocalizedStrings({
    en: {
        //Participant log in
        logIn: "Log in",
        groupID: "Group ID",
        SUBMIT: "SUBMIT",
        signInAsOwner: "Sign in as a group owner",
        correctEmailPasswd: "Please double-check your password and email",
        loggedIn: "You are logged in as ",
        //Group owner sign in
        signIn: "Sign In",
        eMail: "E-mail",
        passwd: "Password",
        SIGN_IN: "SIGN IN",
        forgotPasswd: "Forgot password?",
        noGroupCreaterAcc: "Don't have a group-creater account?",
        signInAsParticipant: "Sign in as a participant",
        //Group owner sigh up
        sighUp: "SIGN UP",
        SIGN_UP: "SIGN UP",
        repeatPasswd: "Confirm your password",
        longerName: "Your name must be longer than 3 characters",
        correctEmail: "Make sure your E-mail is correct",
        registeredEmail: "This E-mail has already been registered",
        completeRegistr: "Registration completed successfully! Now sign in!",
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
        createNewGroup: "CREATE A NEW GROUP",
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
        description: "Description",
        expectAnswer: "Expected answer",
        addNewSubquest: "ADD NEW SUBQUEST",
        addSubquest: "Add Subquest",
        //Edit quest
        noQuests: "You have no quests yet",
        editQuest: "Edit Quest",
        title: "Title",
        EDIT: "EDIT",
        //Edit subquest
        editSubquest: "Edit Subquest",
        typeOfVarification: "Type of verification",
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
        repeatNewPasswd: "Re-enter new password",
        generalSettings: "General Settings",
        language: "Language",
        SAVE_CHANGES: "SAVE CHANGES",
        avatarError: "Avatar loading error",
        //Settings (code)
        sessionTimeout: "Session timeout. Please log in again",
        nameReset: "Your name has been reset successfully!",
        longerPasswd: "Password must be longer than 5 characters",
        passwdMissmatch: "The new password and confirmation password do not match",
        resetPasswd: "Your password has been reset successfully!",
        //Password confirm
        passwdError: "Password was entered incorrectly",
        authorizationError: "Changes processing error, maybe this email has already used.",
        resetData: "Your data has been reset successfully!",
        confirmation: "Confirmation",
        changeEmail: "To change the E-mail you should enter your password",
        //No match
        notFound: "404...Page Not Found",
        homePage: "Go to Home Page",
        //Participant page (left side)
        quests_participant: "Quests",
        group: "Group",
        profile: "Profile",
        myAccount: "My Account",
        messages: "Messages",
        notifications: "Notifications",
        //Me 
        DELETE_MY_ACCOUNT: "DELETE MY ACCOUNT",
        changeAvatar_Me: "You can change your avatar in Settings. Not here",
        changeEmail_Me: "You can change your E-mail in Settings. Not here",
        changeName_Me: "You can change your name in Settings. Not here",
        changeGroup_Me: "You cannot change your group even in Settings",
        quests: "Quests",
        totalPoints: "Total Points",
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
        SENT_ANSWER_NOTIFICATION: '{0} submitted answer for subquest {1}',
        ANSWER_ACCEPTED:'Your answer on subquest "{0}" has been accepted!',
        ANSWER_REJECTED:'Your answer on subquest "{0}" has been rejected.',
        DELETE_THE_GROUP: "Delete the group",
        CONFIRM_DELETING: "Are you sure you want to delete this group?",
        PASSWORD_RECOVERY: "Password restore",
        PASSWORD_RECOVERY_INFO: "To restore the password, enter the email of the account. We will send you an email with the new password generated. After, change the password in the settings.",
        PASSWORD_RECOVERY_CONFIRM: "Restore",
        BACK:"Back",
        PRIVACY: "You have not agreed to the user agreement",
        DELETING_ACCOUNT: "Account deleting",
        DELETING_ACCOUNT_TEXT: "Are you sure you want to delete your account? All progress will be lost!",
        I_AGREE: "I agree with",
        AGREEMENT: "End User License Agreement",
        AND: "and",
        PRIVACY_POLICY: "Privacy Policy",
        IMAGE_INPUT: "Make sure you select an image."
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
        noGroupCreaterAcc: "Нет учетной записи создателя группы?",
        signInAsParticipant: "Войти как участник",
        sighUp: "РЕГИСТРАЦИЯ",
        SIGN_UP: "ЗАРЕГИСТРИРОВАТЬСЯ",
        repeatPasswd: "Повторите Ваш пароль",
        longerName: "Имя должно быть длиннее 3 символов",
        correctEmail: "Проверьте правильность Вашей почты",
        registeredEmail: "Данная почта уже зарегистрирована",
        completeRegistr: "Регистрация успешно завершена! Войдите в аккаунт!",
        myGroups: "Мои группы",
        pendQuests: "Квесты, ожидающие подтверждения",
        settings: "Настройки",
        help: "Помощь",
        helpPage: "Справка",
        logOut: "Выход",
        noGroups: "У Вас пока нет групп",
        yourGroups: "Ваши группы:",
        editMenu: "Редактировать",
        deleteMenu: "Удалить",
        groupEdit: "Редактирование группы",
        enterGroupName: "Введите название группы",
        groupName: "Название группы",
        longerGroupName: "Название группы должно быть длиннее 3 символов",
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
        noNotifications: "У Вас нет непрочитанных уведомлений",
        addMember: "Добавление участника",
        name: "Имя",
        ADD: "ДОБАВИТЬ",
        deleteMember: "Удаление участника",
        doUWantToDelete: "Вы уверены, что хотите удалить участника {0} из этой группы?",
        DELETE: "УДАЛИТЬ",
        quest: "Подквест ",
        description: "Описание",
        expectAnswer: "Ожидаемый ответ",
        addNewSubquest: "ДОБАВИТЬ НОВЫЙ ПОДКВЕСТ",
        addSubquest: "Добавление подквеста",
        noQuests: "У Вас пока нет квестов",
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
        doUWantToDeleteSub: "Вы уверены, что хотите удалить этот подквест {0}?",
        createNewQuest: "Создание нового квеста",
        enterTitle: "Введите название квеста",
        enterPoints: "Введите количество очков за квест",
        points: "Очки",
        deleteQuest: "Удаление квеста",
        doUWantToDeleteQuest: "Вы уверены, что хотите удалить квест {0}?",
        memberAnswer: "Ответ участника: ",
        CONFIRM: "ПОДТВЕРДИТЬ",
        noPendingQuests: "У Вас ещё нет квестов, которые ожидают ответа",
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
        authorizationError: "Ошибка обработки изменений, возможно данный email уже занят.",
        resetData: "Ваши данные были успешно изменены!",
        confirmation: "Подтверждение",
        changeEmail: "Чтобы сменить почту, Вам необходимо ввести пароль",
        notFound: "404...Эта страница не найдена",
        homePage: "Перейти на главную страницу",
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
        SENT_ANSWER_NOTIFICATION: '{0} прислал ответ на подквест {1}',
        ANSWER_ACCEPTED:'Ваш ответ на подквест "{0}" был подтвержден!',
        ANSWER_REJECTED:'Ваш ответ на подквест "{0}" был откланен.',
        DELETE_THE_GROUP: "Удалить группу",
        CONFIRM_DELETING: "Вы уверены, что хотите удалить эту группу?",
        PASSWORD_RECOVERY: "Восстановление пароля",
        PASSWORD_RECOVERY_INFO: "Чтоб восстановить пароль введите почту от аккаунта. Мы пришлем вам письмо с новым сгенерированным паролем. После, поменяйте пароль в настройках.",
        PASSWORD_RECOVERY_CONFIRM: "Восстановить",
        BACK: "Назад",
        PRIVACY: "Вы не подтвердили согласие на пользовательское соглашение",
        I_AGREE: "Я согласен с",
        AGREEMENT: "пользовательским соглашением",
        AND: "и",
        PRIVACY_POLICY: "политикой конфиденциальности",
        DELETING_ACCOUNT: "Удаление аккаунта",
        DELETING_ACCOUNT_TEXT: "Вы уверены, что хотите удалить аккаунт? Весь прогресс будет потерян!",
        quests: "Квесты",
        totalPoints: "Всего очков",
        IMAGE_INPUT: "Убедитесь, что вы выбрали изображение."
    },
    ua: {
        logIn: "Авторизація",
        groupID: "ID групи",
        SUBMIT: "ПІДТВЕРДИТИ",
        signInAsOwner: "Увійти як власник групи",
        correctEmailPasswd: "Переконайтесь, що Ви правильно ввели пошту та пароль",
        loggedIn: "Ви ввійшли як ",
        signIn: "Вхід",
        eMail: "Пошта",
        passwd: "Пароль",
        SIGN_IN: "УВІЙТИ",
        forgotPasswd: "Забули пароль?",
        noGroupCreaterAcc: "Немає облікового запису творця групи?",
        signInAsParticipant: "Увійти як учасник",
        sighUp: "РЕЄСТРАЦІЯ",
        SIGN_UP: "ЗАРЕЄСТРУВАТИСЬ",
        repeatPasswd: "Повторіть Ваш пароль",
        longerName: "Ім'я повинно бути довшим за 3 символи",
        correctEmail: "Перевірте правильність уведеної пошти",
        registeredEmail: "Дана пошта вже зареєстрована",
        completeRegistr: "Реєстрація успішно завершена! Вам треба увійти в акаунт!",
        myGroups: "Мої групи",
        pendQuests: "Квести, що очікують підтвердження",
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
        longerGroupName: "Назва групи повинна бути довшою за 3 символи",
        resetAvatar: "Фото успішно оновлено! Може знадобитись оновлення сторінки",
        CANCEL: "СКАСУВАТИ",
        SAVE: "ЗБЕРЕГТИ",
        createNewGroup: "СТВОРИТИ НОВУ ГРУПУ",
        newGroupCreate: "Створення нової групи",
        CREATE: "СТВОРИТИ",
        members: "УЧАСНИКИ",
        quests_owner: "КВЕСТИ",
        leaderboard: "ТАБЛИЦЯ ЛІДЕРІВ",
        chooseGroup: "Виберіть групу",
        noMembers: "У Вас поки немає учасників",
        noNotifications: "У Вас немає нових сповіщень",
        addMember: "Додавання учасника",
        name: "Ім'я",
        ADD: "ДОДАТИ",
        deleteMember: "Видалення учасника",
        doUWantToDelete: "Ви впевнені, що хочете видалити учасника {0} із цієї групи?",
        DELETE: "ВИДАЛИТИ",
        quest: "Підквест ",
        description: "Опис",
        expectAnswer: "Очікувана відповідь",
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
        enterDescription: "Уведіть опис підквеста",
        deleteSubquest: "Видалення підквеста",
        doUWantToDeleteSub: "Ви впевнені, що хочете видалити цей підквест {0}?",
        createNewQuest: "Створення нового квеста",
        enterTitle: "Введіть назву квеста",
        enterPoints: "Введіть кількість балів за квест",
        points: "Бали",
        deleteQuest: "Видалення квеста",
        doUWantToDeleteQuest: "Ви впевнені, що хочете видалити квест {0}?",
        memberAnswer: "Відповідь учасника: ",
        CONFIRM: "ПІДТВЕРДИТИ",
        noPendingQuests: "У Вас ще немає квестів, які очікують на відповідь",
        accSettings: "Налаштування облікового запису",
        changeAvatar: "ЗМІНИТИ ФОТО",
        newPasswd: "Новий пароль",
        repeatNewPasswd: "Уведіть новий пароль ще раз",
        generalSettings: "Загальні налаштування",
        language: "Мова",
        SAVE_CHANGES: "ЗБЕРЕГТИ ЗМІНИ",
        avatarError: "Помилка під час завантаження фото",
        sessionTimeout: "Час сесії вичерпано. Будь ласка, увійдіть знову",
        nameReset: "Ваше ім'я було успішно змінено!",
        longerPasswd: "Пароль повинен бути довшим за 5 символів",
        passwdMissmatch: "Паролі не збігаються",
        resetPasswd: "Пароль був успішно змінений!",
        passwdError: "Пароль уведений неправильно",
        authorizationError: "Помилка обробки змін, можливо даний email все зайнятий.",
        resetData: "Ваші дані були успішно змінено!",
        confirmation: "Підтвердження",
        changeEmail: "Щоб змінити пошту, Вам необхідно ввести пароль",
        notFound: "404... Ця сторінка не знайдена",
        homePage: "Перейти на головну сторінку",
        quests_participant: "Квести",
        group: "Група",
        profile: "Профіль",
        myAccount: "Мій акаунт",
        messages: "Повідомлення",
        notifications: "Сповіщення",
        DELETE_MY_ACCOUNT: "ВИДАЛИТИ ОБЛІКОВИЙ ЗАПИС",
        changeAvatar_Me: "Змінити фото можна в Налаштуваннях. Тут не можна",
        changeEmail_Me: "Змінити пошту можна в Налаштуваннях. Тут не можна",
        changeName_Me: "Змінити ім'я можна в Налаштуваннях. Тут не можна",
        changeGroup_Me: "Змінити свою групу не можна навіть в Налаштуваннях",
        progress: "Прогрес: ",
        subquest: "Підквест",
        answer: "Відповідь",
        LOG_OUT: "Вихід",
        smthWrong: "Щось пішло не так...",
        answerProcess: "Вашу відповідь відправлено на обробку",
        alreadySentAnswer: "Ви вже відправили відповідь",
        sendAnswer: "Відправити відповідь",
        sendPhoto: "Відправити картинку",
        COMPLETED_SUBQUEST_OWNER_NOTIFICATION: '{0} виконав підквест {1}',
        COMPLETED_QUEST_OWNER_NOTIFICATION: '{0} завершив квест {1}',
        SENT_ANSWER_NOTIFICATION: '{0} відправив відповідь на підквест {1}',
        ANSWER_ACCEPTED:'Ваша відповідь на підквест "{0}" була підтверждена!',
        ANSWER_REJECTED:'Ваша відповідь на підквест "{0}" була відхилена.',
        DELETE_THE_GROUP: "Видалення групи",
        CONFIRM_DELETING: "Ви впевнені, що хочете видалити цю групу?",
        PASSWORD_RECOVERY: "Відновлення паролю",
        PASSWORD_RECOVERY_INFO: "Щоб відновити пароль введіть пошту від аккаунта. Ми надішлемо вам лист з новим згенерував паролем. Після, поміняйте пароль в налаштуваннях.",
        PASSWORD_RECOVERY_CONFIRM: "Відновити",
        BACK: "Назад",
        PRIVACY: "Ви не підтвердили згоду на угоду користувача",
        I_AGREE: "Я згоден з",
        DELETING_ACCOUNT: "Видалення акаунту",
        DELETING_ACCOUNT_TEXT: "Ви впевнені, що хочете видалити свій акаунт? Весь прогрес буде втрачений!",
        quests: "Квести",
        totalPoints: "Загальна кількість балів",
        IMAGE_INPUT: "Переконайтеся, що ви вибрали зображення."
    }
});

function getCustomLang() {
    return getLocalStorage('lang') || navigator.language;
}