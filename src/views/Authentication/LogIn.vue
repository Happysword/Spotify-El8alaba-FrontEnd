<template>
  <v-container class="LogIn_root py-0">

    <!-- Main row -->
    <v-row
      justify=center
      align=center
    >
      <v-col
        sm=8
        lg=6
        xl=4
        class="px-8"
      >
        <!-- Logo -->
        <v-img
          src="../../assets/imgs/El-8alaba.png"
          contain
          height="140"
        ></v-img>

        <!-- Username -->
        <v-text-field
          v-model="userInput.id"
          clearable
          outlined
          placeholder="Email address or username"
          :rules="[]"
          color='#1DB954'
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
          color='#1DB954'
          @click:append="userInput.password.show = !userInput.password.show"
        />

        <v-row>
          <!-- 'Remember me' checkbox -->
          <v-checkbox
            label="Remember me"
            v-model="userInput.rememberMe"
            class="mt-0"
            color='#1DB954'
          />
          <v-spacer/>
          <!-- 'Submit' button -->
          <v-btn
            rounded
            min-width=160px
            dark
            color='#1DB954'
            class="d-none d-sm-flex"
          >Log In</v-btn>
        </v-row>

        <!-- Show only on xs -->
        <v-btn
          rounded
          block
          dark
          color='#1DB954'
          class="mb-3 d-flex d-sm-none"
        >Log In</v-btn>

        <!-- 'Forgot your password' link -->
        <v-container class="text-center">
          <!-- TODO[@XL3]: Replace 'font-weight-bold' with a lightening of color -->
          <a
            style="text-decoration: none; color: #1DB954;"
            :class="userInput.onForgot ? 'font-weight-bold' : ''"
            @mouseover="userInput.onForgot = true"
            @mouseleave="userInput.onForgot = false"
          >Forgot your password?</a>
        </v-container>
        <v-divider class="my-3"/>

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
        >Sign Up</v-btn>

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
