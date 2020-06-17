package com.example.myapplication

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase
import kotlinx.android.synthetic.main.activity_main.*
import android.R.string
import android.app.ProgressDialog
import android.provider.ContactsContract.CommonDataKinds.Email
import androidx.appcompat.widget.Toolbar
import com.google.firebase.auth.FirebaseUser
import java.util.*
import kotlin.concurrent.schedule
import FireBaseService




class MainActivity : AppCompatActivity() {

    private lateinit var auth: FirebaseAuth
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)


        if (getIntent().getBooleanExtra("EXIT", false)) {
            finish();
        }

        main_button_register.setOnClickListener {
            val intent = Intent(this@MainActivity, SignupActivity::class.java)
            startActivity(intent)
        }
        main_button_login.setOnClickListener {
            //Log.d("MainActivity", "Try to show login activity")
            val intent = Intent(this@MainActivity, LoginActivity::class.java)
            startActivity(intent)
            //Log.d("MainActivity", "Try to show login activity 2")
        }
        // Initialize Firebase Auth
        auth = Firebase.auth


    }

    public override fun onStart() {
        super.onStart()
        val dialog = ProgressDialog(this)
        dialog.setMessage("Checking auth")
        dialog.setCancelable(false)
        dialog.setInverseBackgroundForced(false)
        dialog.show()
        // Check if user is signed in (non-null) and update UI accordingly.
        val user = auth.currentUser
        if (user != null) {

            val intent = Intent(this, DeviceActivity::class.java)

            UserSingleton.getInstance().name = user.displayName .toString()
            UserSingleton.getInstance().email = user.email.toString()
            UserSingleton.getInstance().loged_in = true
            Timer("SettingUp", false).schedule(500) {
                startActivity(intent)
            }
            dialog.hide()
        }
        else dialog.hide()
        startService(Intent(this, FireBaseService::class.java))

    }



}