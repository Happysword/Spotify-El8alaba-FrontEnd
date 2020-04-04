<template>
<v-app>
<v-content class="grey lighten-4 pa-8">
<!-- Root Container -->
<v-container id="EditProfile_root">
  <p id="title"
     class="spotify-green headline pt-6 pl-3 mb-12">
    Edit Profile
  </p>

  <v-card flat id="formCard">
    <!-- Form -->
    <v-form class="py-12 px-12" ref="editProfileForm">
      <!-- Email -->
      <v-text-field id="emailField"
                    color="#1DB954"
                    outlined
                    label="Email"
                    v-model="userInput.email"
                    :rules="[
                      validation.required('Email'),
                      validation.minLength('Email', 3),
                      validation.validEmail(),
                    ]"/>

      <!-- Confirm Password -->
      <!-- Minimum password length is 8 -->
      <v-text-field id="passwordField"
                    color="#1DB954"
                    outlined
                    label="Password"
                    v-model="userInput.password"
                    :rules="[
                      validation.required('Password'),
                      validation.minLength('Password', 8),
                    ]"
                    :type="userInput.showPassword ? 'text' : 'password'"
                    :append-icon="userInput.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="userInput.showPassword = !userInput.showPassword"/>

      <!-- Gender -->
      <v-select id="genderSelect"
                color="#1DB954"
                label="Gender"
                :items="genders"
                v-model="userInput.gender"
                :rules="[validation.required('Gender')]"
                outlined/>

      <!-- Date of Birth -->
      <p class="subtitle-2 grey--text text--darken-1">Date of Birth</p>
      <v-row class="mt-n6 mb-n4">
        <!-- Day -->
        <v-col cols="3">
          <v-text-field id="dobDayField"
                        color="#1DB954"
                        outlined
                        label="Day"
                        v-model="userInput.dob.day"
                        :rules="[validation.validDay()]"/>
        </v-col>
        <!-- Month -->
        <v-col>
          <v-select id="dobMonthSelect"
                    color="#1DB954"
                    outlined
                    label="Month"
                    :items="months"
                    v-model="userInput.dob.month"
                    :rules="[validation.required('Month')]"/>
        </v-col>
        <!-- Year -->
        <v-col cols="3">
          <v-text-field id="dobYearField"
                        color="#1DB954"
                        outlined
                        label="Year"
                        v-model="userInput.dob.year"
                        :rules="[validation.validYear()]"/>
        </v-col>
      </v-row>

      <!-- Country -->
      <v-select id="countrySelect"
                color="#1DB954"
                label="Country"
                :items="countries"
                v-model="userInput.country"
                :rules="[validation.required('Country')]"
                outlined/>

      <!-- Mobile Phone Number -->
      <v-text-field id="phoneField"
                    color="#1DB954"
                    outlined
                    label="Mobile Phone Number"
                    v-model="userInput.phone"
                    :rules="[
                      validation.required('Mobile Phone Number'),
                      validation.validMobilePhoneNumber(),
                    ]"/>
      <v-row justify="end">
        <router-link to="/account/overview">
          <v-btn id="cancelBtn"
                 class="mr-4" text rounded>
            Cancel
          </v-btn>
        </router-link>
        <v-btn id="saveBtn"
               class="mr-4" color="#1DB954" rounded dark
               @click="submit">
          Save Profile
        </v-btn>
      </v-row>
    </v-form>
  </v-card>

</v-container>
</v-content>
</v-app>
</template>

<script>
import validation from '@/store/modules/auth/validation';

export default {
  name: 'EditProfile',
  data: () => ({
    months: [
      { text: 'January', value: '01' },
      { text: 'February', value: '02' },
      { text: 'March', value: '03' },
      { text: 'April', value: '04' },
      { text: 'May', value: '05' },
      { text: 'June', value: '06' },
      { text: 'July', value: '07' },
      { text: 'August', value: '08' },
      { text: 'September', value: '09' },
      { text: 'October', value: '10' },
      { text: 'November', value: '11' },
      { text: 'December', value: '12' },
    ],
    genders: [
      { text: 'Male', value: 'm' },
      { text: 'Female', value: 'f' },
    ],
    countries: [
      { text: 'Egypt', value: 'EG' },
    ],
    userInput: {
      email: '',
      password: '',
      showPassword: false,
      gender: '',
      dob: {
        day: '',
        month: '',
        year: '',
      },
      country: '',
      phone: '',
      incorrect: false,
    },
    validation,
  }),
  methods: {
    /**
     * Submits input and edits the user's profile
     * @todo[XL3] Implement this after reaching out to backend
     */
    async submit() {
      if (!this.$refs.editProfileForm.validate()) return;

      console.log('success');
    },
  },
};
</script>

<style lang="css" scoped>
a {
  text-decoration: none !important;
}

.spotify-green {
  color: #1DB954 !important;
}
</style>
