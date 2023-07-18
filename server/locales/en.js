// @ts-check

export default {
  translation: {
    appName: 'Task Manager',
    flash: {
      session: {
        create: {
          success: 'You are logged in',
          error: 'Wrong email or password',
        },
        delete: {
          success: 'You are logged out',
        },
      },
      users: {
        create: {
          error: 'Failed to register',
          success: 'User registered successfully',
        },
        update: {
          error: 'Unable to change user',
          success: 'User changed successfully',
          notAllowed: 'Cannot change another user',
          notFound: 'User not found',
        },
        delete: {
          error: 'Unable to delete user',
          success: 'User deleted successfully',
          notAllowed: 'Cannot delete another user',
        },
      },
      authError: 'Access denied! Please login',
    },
    layouts: {
      application: {
        users: 'Users',
        signIn: 'Login',
        signUp: 'Register',
        signOut: 'Logout',
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Login',
          submit: 'Login',
          email: 'Email',
          password: 'Password',
        },
      },
      users: {
        users: 'Users',
        id: 'ID',
        fullName: 'Full name',
        email: 'Email',
        createdAt: 'Created at',
        actions: 'Actions',
        delete: 'Delete',
        new: {
          submit: 'Register',
          signUp: 'Register',
          firstname: 'First name',
          lastname: 'Last name',
          email: 'Email',
          password: 'Password',
        },
      },
      welcome: {
        index: {
          hello: 'Hello from Hexlet!',
          description: 'Online programming school',
          more: 'Learn more',
        },
      },
      edit: {
        edit: 'Change user',
        firstname: 'First name',
        lastname: 'Last name',
        email: 'Email',
        password: 'Password',
        submit: 'Edit',
      },
    },
  },
};
