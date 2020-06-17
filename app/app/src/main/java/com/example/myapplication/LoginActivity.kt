package com.example.myapplication

//import com.google.firebase.auth.FirebaseAuth


import android.app.ProgressDialog
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase
import kotlinx.android.synthetic.main.activity_login.*

class LoginActivity: AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_login)

        if (UserSingleton.getInstance().loged_in == true){
            val intent = Intent(this, DeviceActivity::class.java)
            startActivity(intent)
        }
        control_perform_button.setOnClickListener {
            val loader: ProgressDialog
            loader = ProgressDialog(this)
            loader.setMessage("Signing in..")
            loader.setTitle("Moving on")
            loader.isIndeterminate = false
            loader.setCancelable(false)
            loader.show()

            val email = email_edittext_login.text.toString()
            val password = password_edittext_login.text.toString()

            Log.d("Login", "Attempt login with email/pw: $email/***")

            FirebaseAuth.getInstance().signInWithEmailAndPassword(email, password)
                .addOnCompleteListener(this) { task ->
                    if (task.isSuccessful) {
                        // Sign in success, update UI with the signed-in user's information
                        val user = Firebase.auth.currentUser
                        UserSingleton.getInstance().name = user?.displayName .toString()
                        UserSingleton.getInstance().email = user?.email.toString()
                        UserSingleton.getInstance().loged_in = true
                        //UserSingleton.getInstance().image_url = user?.photoUrl.toString()
                        val intent = Intent(this, DeviceActivity::class.java)
                        startActivity(intent)
                        loader.dismiss()
                    } else {
                        // If sign in fails, display a message to the user.
                        Toast.makeText(
                            baseContext, "Authentication failed.",
                            Toast.LENGTH_SHORT
                        ).show()

                        // ...
                    }
                }
        }



        move_to_register_textview.setOnClickListener{
            val loader: ProgressDialog
            loader = ProgressDialog(this)
            loader.setMessage("Loading..")
            loader.setTitle("Verifing")
            loader.isIndeterminate = false
            loader.setCancelable(false)
            loader.show()
            loader.dismiss()
            val intent = Intent(this, SignupActivity::class.java)
            startActivity(intent)
        }
    }

}