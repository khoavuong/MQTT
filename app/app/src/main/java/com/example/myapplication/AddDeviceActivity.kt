package com.example.myapplication

import android.app.AlertDialog
import android.content.DialogInterface
import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import android.view.View
import android.widget.*
import com.google.firebase.auth.ktx.auth
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener
import com.google.firebase.database.ktx.database
import com.google.firebase.ktx.Firebase
import kotlinx.android.synthetic.main.activity_add_device.*
import layout.Device
import layout.genId

class AddDeviceActivity : AppCompatActivity(){

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_add_device)
        var spinner = findViewById<Spinner>(R.id.type_spinner)
        ArrayAdapter.createFromResource(
                this,
                R.array.type_array,
                android.R.layout.simple_spinner_item
        ).also { adapter ->
            adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
            spinner.adapter = adapter
        }

        var type:Int = 0
        var value:Int = 0

        spinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(parent: AdapterView<*>, view: View, position: Int, id: Long) {
                val selectedItem = parent.getItemAtPosition(position).toString()
                if (selectedItem == "Air Conditioner") {
                    editText_humid.setEnabled(false)
                    wind_spinner.setEnabled(false)
                    editText_temp.setEnabled(true)
                    type = 1
                }
                else if (selectedItem == "Humidifier") {
                    editText_humid.setEnabled(true)
                    wind_spinner.setEnabled(false)
                    editText_temp.setEnabled(false)
                    type = 2
                }
                else if (selectedItem == "Fan Controller") {
                    editText_humid.setEnabled(false)
                    wind_spinner.setEnabled(true)
                    editText_temp.setEnabled(false)
                    type = 3
                }
            } // to close the onItemSelected

            override fun onNothingSelected(parent: AdapterView<*>) {
                add_perform_button.setEnabled(false)
            }
        }
        editText_humid.setOnFocusChangeListener { view, isFocus ->
            try {
                if (!isFocus) {
                    val input = editText_humid.text.toString().toInt()
                    if (input < 0) {
                        Toast.makeText(this, "Input Humidity must be greater than 0", Toast.LENGTH_SHORT).show()
                        editText_humid.setText("0")
                    }
                    if (input > 100) {
                        Toast.makeText(this, "Input Humidity must be smaller than 100", Toast.LENGTH_SHORT).show()
                        editText_humid.setText("100")
                    }
                }
            }catch (fne:NumberFormatException){
                Toast.makeText(this, "Wrong number format", Toast.LENGTH_SHORT).show()
                editText_humid.setText("0")
            }
        }
        editText_temp.setOnFocusChangeListener { view, isFocus ->
            try{
                if(!isFocus){
                    val input = editText_temp.text.toString().toInt()
                    if (input < 0) {
                        Toast.makeText(this, "Input Temperature must be greater than 0", Toast.LENGTH_SHORT).show()
                        editText_temp.setText("0")
                    }
                    if (input > 100) {
                        Toast.makeText(this, "Input Temperature must be smaller than 100", Toast.LENGTH_SHORT).show()
                        editText_temp.setText("100")
                    }
                }
            }catch (fne:NumberFormatException){
                Toast.makeText(this, "Wrong number format", Toast.LENGTH_SHORT).show()
                editText_temp.setText("0")
            }
        }

        var wind : Int = -1
        ArrayAdapter.createFromResource(
            this,
            R.array.wind_strength_level_array,
            android.R.layout.simple_spinner_item
        ).also { adapter ->
            adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
            wind_spinner.adapter = adapter
        }

        wind_spinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(parent: AdapterView<*>, view: View, position: Int, id: Long) {
                val selectedItem = parent.getItemAtPosition(position).toString()
                if (selectedItem == "Low") {
                    wind = 1
                }
                else if (selectedItem == "Medium") {
                    wind = 2
                }
                else if (selectedItem == "High") {
                    wind = 3
                }
                if (type == 3) add_perform_button.setEnabled(true)
            } // to close the onItemSelected

            override fun onNothingSelected(parent: AdapterView<*>) {
                if (type == 3) add_perform_button.setEnabled(false)
            }
        }

        add_perform_button.setOnClickListener {

            if (type == 1)
                value = editText_temp.text.toString().toInt()
            else if (type == 2)
                value = editText_humid.text.toString().toInt()
            else if (type == 3)
                value = wind


            val uid = Firebase.auth.currentUser?.uid

            val ref = FirebaseDatabase.getInstance().getReference().child(uid.toString())

            ref.addValueEventListener(object : ValueEventListener {
                override fun onDataChange(dataSnapshot: DataSnapshot) {
                    if (dataSnapshot.exists())
                        genId.maxId = dataSnapshot.getChildrenCount()

                }
                override fun onCancelled(error: DatabaseError) {
                    Toast.makeText(this@AddDeviceActivity, "Failed to generate ID", Toast.LENGTH_SHORT).show()
                }
            })
            val device = (Device((genId.maxId+1).toInt(),
                    device_name_input.text.toString(),
                    type,
                    topic_input.text.toString(),
                    active_switch.isChecked,
                    value
            ))
            val reff = Firebase.database.reference
            reff.child(Firebase.auth.currentUser?.uid.toString()).child((genId.maxId+1).toString()).setValue(device)
                    .addOnSuccessListener {
                        //Toast.makeText(this, "Added Successfully", Toast.LENGTH_SHORT).show()
                        val intent = Intent(this@AddDeviceActivity, DeviceActivity::class.java)
                        intent.putExtra("RELOAD_NEEDED", true)
                        startActivity(intent)
                    }

                    .addOnFailureListener {
                        val alert = AlertDialog.Builder(this@AddDeviceActivity)
                        alert.setMessage("Error Occured")
                        alert.setTitle("Can't add device data")
                        alert.setPositiveButton("Retry", DialogInterface.OnClickListener { dialog, whichButton ->
                            run {
                                reff.child(Firebase.auth.currentUser?.uid.toString()).child((genId.maxId+1).toString()).setValue(device)                            }
                        })
                        alert.setNegativeButton("Cancel", null)
                    }
        }
    }
}
