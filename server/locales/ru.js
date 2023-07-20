// @ts-check

export default {
  translation: {
    appName: 'Менеджер задач',
    flash: {
      session: {
        create: {
          success: 'Вы залогинены',
          error: 'Неправильный емейл или пароль',
        },
        delete: {
          success: 'Вы разлогинены',
        },
      },
      users: {
        create: {
          error: 'Не удалось зарегистрировать',
          success: 'Пользователь успешно зарегистрирован',
        },
        update: {
          error: 'Не удалось изменить пользователя',
          success: 'Пользователь успешно изменен',
          notAllowed: 'Нельзя изменить другого пользователя',
          notFound: 'Пользователь не найден',
        },
        delete: {
          error: 'Не удалось удалить пользователя',
          success: 'Пользователь успешно удален',
          notAllowed: 'Нельзя удалить другого пользователя',
        },
      },
      statuses: {
        create: {
          error: 'Не удалось установить статус',
          success: 'Статус успешно создан',
        },
        update: {
          error: 'Не удалось изменить статус',
          success: 'Статус успешно изменен',
          notAllowed: 'Нельзя изменить статус другого пользователя',
          notFound: 'Статус не найден',
        },
        delete: {
          error: 'Не удалось удалить статус',
          success: 'Статус успешно удален',
          notAllowed: 'Нельзя удалить статус другого пользователя',
        },
      },
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
    },
    layouts: {
      application: {
        users: 'Пользователи',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход',
        statuses: 'Статусы',
        labels: 'Метки',
        tasks: 'Задачи',
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Вход',
          submit: 'Войти',
          email: 'Email',
          password: 'Пароль',
        },
      },
      users: {
        users: 'Пользователи',
        id: 'ID',
        fullName: 'Полное имя',
        email: 'Email',
        createdAt: 'Дата создания',
        actions: 'Действия',
        delete: 'Удалить',
        new: {
          submit: 'Сохранить',
          signUp: 'Регистрация',
          firstname: 'Имя',
          lastname: 'Фамилия',
          email: 'Email',
          password: 'Пароль',
        },
      },
      welcome: {
        index: {
          hello: 'Привет от Хекслета!',
          description: 'Практические курсы по программированию',
          more: 'Узнать Больше',
        },
      },
      edit: {
        edit: 'Изменение пользователя',
        firstname: 'Имя',
        lastname: 'Фамилия',
        email: 'Email',
        password: 'Пароль',
        submit: 'Изменить',
      },
      statuses: {
        statuses: 'Статусы',
        createStatus: 'Создать статус',
        id: 'ID',
        name: 'Наименование',
        createdAt: 'Дата создания',
        delete: 'Удалить',
        new: {
          create: 'Создание статуса',
          name: 'Наименование',
          submit: 'Создать',
        },
        edit: {
          edit: 'Изменение статуса',
          name: 'Наименование',
          submit: 'Изменить',
        },
      },
    },
  },
};
