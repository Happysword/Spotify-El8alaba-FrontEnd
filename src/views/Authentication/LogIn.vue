<template>
  <v-container class="LogIn_root">
    <v-row
      justify=center
      align=center
    >
      <v-col
        cols=6
        xl=4
        class="mt-12"
      >
        <!-- Username -->
        <v-text-field
          v-model="userInput.id"
          clearable
          outlined
          placeholder="Email address or username"
          :rules="[]"
        />

        <!-- Password -->
        <v-text-field
          clearable
          outlined
          placeholder="Password"
          v-model="userInput.password.password"
          :append-icon="userInput.password.show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="userInput.password.show ? 'text' : 'password'"
          :rules="[]"
          @click:append="userInput.password.show = !userInput.password.show"
        />

        <v-row>
          <!-- 'Remember me' checkbox -->
          <v-checkbox
            label="Remember me"
            v-model="userInput.rememberMe"
          />
          <v-spacer/>
          <!-- 'Submit' button -->
          <v-btn
            rounded
            color=primary
            min-width=160px
          >Log In</v-btn>
        </v-row>

        <!-- 'Forgot your password' link -->
        <v-row justify=center>
          <!-- TODO[@XL3]: Replace 'font-weight-bold' with a lightening of color -->
          <a
            style="text-decoration: none;"
            :class="userInput.onForgot ? 'font-weight-bold' : ''"
            @mouseover="userInput.onForgot = true"
            @mouseleave="userInput.onForgot = false"
          >Forgot your password?</a>
        </v-row>
        <v-divider class="my-6"/>

        <p class="title text-center font-weight-bold"
        >Don't have an account?</p>
        <!-- 'Signup' button -->
        <!-- TODO[@XL3]: Replace 'route to' with a method -->
        <v-btn
          rounded
          outlined
          color=secondary
          block
          large
          route to="/signup"
        >Sign Up for wave</v-btn>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LogIn',

  data() {
    return {
      userInput: {
        id: '',
        password: {
          password: '',
          show: false,
        },
        rememberMe: false,
        onForgot: false,
      },

      rules: {
      },
    };
  },
};
</script>

<style lang="css" scoped>
</style>
