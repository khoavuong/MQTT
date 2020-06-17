package com.example.myapplication

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase
import android.R.string
import android.app.ProgressDialog
import android.provider.ContactsContract.CommonDataKinds.Email
import com.google.firebase.auth.FirebaseUser
import kotlinx.android.synthetic.main.activity_signup.*
import org.junit.experimental.results.ResultMatchers.isSuccessful
import com.google.android.gms.tasks.Task
import androidx.annotation.NonNull
import com.google.android.gms.tasks.OnCompleteListener
import com.google.firebase.auth.UserProfileChangeRequest
import com.google.firebase.auth.FirebaseAuthUserCollisionException
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException
import com.google.firebase.auth.FirebaseAuthWeakPasswordException
//import jdk.nashorn.internal.runtime.ECMAException.getException
import org.junit.experimental.results.ResultMatchers.isSuccessful






class SignupActivity : AppCompatActivity() {

    private lateinit var auth: FirebaseAuth
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_signup)

        register_button_register.setOnClickListener {
            performRegister()
        }
        already_have_account_text_view.setOnClickListener {
            //Log.d("MainActivity", "Try to show login activity")
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
            //Log.d("MainActivity", "Try to show login activity 2")
        }
        // Initialize Firebase Auth
        auth = Firebase.auth


    }

    private fun performRegister() {
        val email = email_edittext_register.text.toString()
        val password = password_edittext_register.text.toString()
        val name = username_edittext_register.text.toString()

        if (email.isEmpty() || password.isEmpty()) {
            Toast.makeText(this, "Please enter text in email/pw", Toast.LENGTH_SHORT).show()
            return
        }
        FirebaseAuth.getInstance().createUserWithEmailAndPassword(email, password)
            .addOnCompleteListener {
                if (it.isSuccessful) {
                    Toast.makeText(this, "Successfully created user with uid: ${it.result?.user?.uid}", Toast.LENGTH_SHORT).show()
                    val intent = Intent(this, DeviceActivity::class.java)

                    val loader: ProgressDialog
                    loader = ProgressDialog(this)
                    loader.setMessage("Loading..")
                    loader.setTitle("Verifing")
                    loader.isIndeterminate = false
                    loader.setCancelable(false)
                    loader.show()

                    val user = FirebaseAuth.getInstance().currentUser

                    val profileUpdates = UserProfileChangeRequest.Builder()
                        .setDisplayName(name).build()

                    user!!.updateProfile(profileUpdates)
                        .addOnCompleteListener { task ->
                            if (task.isSuccessful) {
                                Toast.makeText(this, "User profile updated.", Toast.LENGTH_SHORT).show()
                            }
                        }
                    loader.dismiss()
                    startActivity(intent)
                    return@addOnCompleteListener
                }
                else try {
                            throw it.getException()!!
                        } catch (weakPassword: FirebaseAuthWeakPasswordException) {
                            Toast.makeText(this,"weak_password",Toast.LENGTH_SHORT).show()
                        } catch (malformedEmail: FirebaseAuthInvalidCredentialsException) {
                            Toast.makeText(this,"malformed_email",Toast.LENGTH_SHORT).show()
                        } catch (existEmail: FirebaseAuthUserCollisionException) {
                            Toast.makeText(this,"exist_email",Toast.LENGTH_SHORT).show()
                        } catch (e: Exception) {
                            Toast.makeText(this,e.message.toString(),Toast.LENGTH_SHORT).show()
                        }

            }
            .addOnFailureListener{
                Toast.makeText(this, "Failed to create user: ${it.message}", Toast.LENGTH_SHORT).show()
            }
    }

}
