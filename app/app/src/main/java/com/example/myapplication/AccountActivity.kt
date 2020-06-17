package com.example.myapplication


import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import android.app.ProgressDialog
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_account.*
import android.app.AlertDialog
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase
import android.content.DialogInterface
import android.content.Intent
import android.util.Log
import android.widget.EditText
import com.google.firebase.auth.EmailAuthProvider
import org.junit.experimental.results.ResultMatchers.isSuccessful
import com.google.android.gms.tasks.Task
import androidx.annotation.NonNull
import com.google.android.gms.tasks.OnCompleteListener
import com.google.firebase.auth.UserProfileChangeRequest
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import kotlinx.android.synthetic.main.activity_device.*
import layout.dataListHolder


class AccountActivity : AppCompatActivity(){


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_account)
        account_email.text = UserSingleton.getInstance().email
        if (UserSingleton.getInstance().name == null) {
            account_name.text = "<< Set Name Up >>"
            account_name.setOnClickListener {
                val alert = AlertDialog.Builder(this)
                val edittext = EditText(this)
                alert.setMessage("Enter Your New Password")
                alert.setTitle("Enter The New One!")
                alert.setView(edittext)

                val loader: ProgressDialog
                loader = ProgressDialog(this)
                loader.setMessage("Loged In..")
                loader.setTitle("Moving on")
                loader.isIndeterminate = false
                loader.setCancelable(false)
                loader.show()

                alert.setPositiveButton("OK", DialogInterface.OnClickListener { dialog, whichButton ->
                    run {val new_name = edittext.text.toString()
                        edittext.text.clear()
                        loader.show()
                        val user = FirebaseAuth.getInstance().currentUser
                        val profileUpdates = UserProfileChangeRequest.Builder()
                            .setDisplayName(new_name).build()

                        user!!.updateProfile(profileUpdates)
                            .addOnCompleteListener { task ->
                                if (task.isSuccessful) {
                                    Toast.makeText(this, "User profile updated", Toast.LENGTH_SHORT).show()
                                }
                            }
                    }

                })
                alert.setNegativeButton("Cancel", null)
                alert.show()
            }

        }
        else account_name.text = UserSingleton.getInstance().name

        account_button_logout.setOnClickListener {
            Firebase.auth.signOut()
            UserSingleton.getInstance().reset()
            dataListHolder.dataList.clear()
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
        }

        account_change_password.setOnClickListener {
            val alert = AlertDialog.Builder(this)
            val alert2 = AlertDialog.Builder(this)
            val alert3 = AlertDialog.Builder(this)
            val edittext = EditText(this)
            val edittext2 = EditText(this)
            val edittext3 = EditText(this)
            alert.setMessage("Enter Your New Password")
            alert.setTitle("Enter The New One!")
            alert.setView(edittext)

            alert2.setMessage("Enter Your New Password")
            alert2.setTitle("Verify!")
            alert2.setView(edittext2)

            alert3.setMessage("Enter Your Current Password")
            alert3.setTitle("Confirm!")
            alert3.setView(edittext3)

            var new_pass = ""
            alert.setPositiveButton("OK", DialogInterface.OnClickListener { dialog, whichButton ->
                run {new_pass = edittext.text.toString()
                edittext.text.clear()
                    alert2.show()
                }

            })

            alert.setNegativeButton("Cancel", null)

            alert2.setPositiveButton("OK", DialogInterface.OnClickListener { dialog, whichButton ->
                run {
                    edittext.text.clear()
                    val nDialog: ProgressDialog
                        nDialog = ProgressDialog(this)
                        nDialog.setMessage("Loading..")
                        nDialog.setTitle("Verifing")
                        nDialog.isIndeterminate = false
                        nDialog.setCancelable(false)
                        nDialog.show()
                        nDialog.dismiss()
                    if (edittext2.text.toString() == new_pass) {
                        alert3.show()
                    }
                    else Toast.makeText(this, "Verify Falied!",Toast.LENGTH_SHORT).show()
                }

            })

            alert2.setNegativeButton("Cancel", null)
            alert3.setPositiveButton("OK", DialogInterface.OnClickListener { dialog, whichButton ->
                run {
                    val pass = edittext3.text.toString()
                    edittext.text.clear()
                    val nDialog: ProgressDialog
                        nDialog = ProgressDialog(this)
                        nDialog.setMessage("Loading..")
                        nDialog.setTitle("Verifing")
                        nDialog.isIndeterminate = false
                        nDialog.setCancelable(false)
                        nDialog.show()

                    val user = Firebase.auth.currentUser
                    val credential = EmailAuthProvider
                        .getCredential(UserSingleton.getInstance().email, pass)
                    Toast.makeText(this, UserSingleton.getInstance().name + pass, Toast.LENGTH_SHORT).show()

                    if (user != null){
                        user.reauthenticate(credential)
                            .addOnCompleteListener {task->
                                if (task.isSuccessful) {
                                    user.updatePassword(new_pass).addOnCompleteListener { task ->
                                        val complete_alert = AlertDialog.Builder(this)

//builder.setPositiveButton("OK", DialogInterface.OnClickListener(function = x))

                                        complete_alert.setPositiveButton(android.R.string.yes) { dialog, which ->
                                            Toast.makeText(applicationContext,
                                                android.R.string.yes, Toast.LENGTH_SHORT).show()
                                        }

                                        complete_alert.setNegativeButton(android.R.string.no) { dialog, which ->
                                            Toast.makeText(applicationContext,
                                                android.R.string.no, Toast.LENGTH_SHORT).show()
                                        }
                                        if (task.isSuccessful) {
                                            complete_alert.setTitle("Finish")
                                            complete_alert.setMessage("Update Success")
                                            nDialog.dismiss()
                                            complete_alert.show()
                                        } else {
                                            complete_alert.setTitle("Error Updating")
                                            complete_alert.setMessage("Can't perform update right now. Try again!")
                                            nDialog.dismiss()
                                            complete_alert.show()
                                        }
                                    }
                                } else {
                                    Toast.makeText(this, "Error auth failed", Toast.LENGTH_SHORT).show()
                                }
                        }
                    }
                }

            })
            alert3.setNegativeButton("Cancel", null)
            alert.show()

        }

//        val dialog = ProgressDialog(context)
//        dialog.setMessage("message")
//        dialog.setCancelable(false)
//        dialog.setInverseBackgroundForced(false)
//        dialog.show()
    }
}
