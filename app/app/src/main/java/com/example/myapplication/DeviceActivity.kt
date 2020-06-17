package com.example.myapplication

import android.app.AlertDialog
import android.app.Dialog
import android.app.ProgressDialog
import android.content.DialogInterface
import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.view.*
import android.widget.*
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.google.android.material.snackbar.Snackbar
import androidx.core.view.GravityCompat
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.drawerlayout.widget.DrawerLayout
import com.google.android.material.navigation.NavigationView
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.core.content.res.ResourcesCompat
import androidx.recyclerview.widget.RecyclerView
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.UserProfileChangeRequest
import com.google.firebase.auth.ktx.auth
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener
import com.google.firebase.database.ktx.database
import com.google.firebase.ktx.Firebase
import layout.Device
import java.util.*
import com.vlstr.blurdialog.BlurDialog
import kotlinx.android.synthetic.main.activity_add_device.*
import kotlinx.android.synthetic.main.activity_device.*
import kotlinx.android.synthetic.main.content_main.*
import layout.dataListHolder.dataList
import layout.genId
import FireBaseService

class DeviceActivity : AppCompatActivity(), NavigationView.OnNavigationItemSelectedListener {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_device)
        val toolbar: Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)

        val fab: FloatingActionButton = findViewById(R.id.add_device_button)
        fab.setOnClickListener { view ->
            Snackbar.make(view, "Add Device", Snackbar.LENGTH_LONG)
                .setAction("Action", null).show()
            val intent = Intent(this, AddDeviceActivity::class.java)
            startActivity(intent)
        }
        val recyclerView = findViewById<androidx.recyclerview.widget.RecyclerView>(R.id.ryc_view)

        loadDeviceData()
        recyclerView.addOnItemTouchListener(RecyclerItemClickListenr(this, recyclerView, object : RecyclerItemClickListenr.OnItemClickListener {

            override fun onItemClick(view: View, position: Int) {
                val blurDialog = findViewById<BlurDialog>(R.id.blurView)
                blurDialog.create(getWindow().getDecorView(), 20)
                val device = dataList.get(position).copy()
                val device_origin = dataList.get(position).copy()
                var min = 0
                var max = 100
                when(device.type){
                    3 -> {min = 1
                        max = 3}
                }
                name_control.setText(device.name)
                active_text.setText("now following at MQTT topic:\n"+ device.topic)
                image_delete.setOnClickListener{
                    val alert = AlertDialog.Builder(this@DeviceActivity)
                    alert.setMessage("Confirm Remove Device Observer")
                    alert.setTitle("Do you need to remove [^]?")
                    alert.setPositiveButton("OK", DialogInterface.OnClickListener { dialog, whichButton ->
                        run {
                            val uid = Firebase.auth.currentUser?.uid
//        dialog.show()
                            val reff = FirebaseDatabase.getInstance().getReference().child(uid.toString())
                            val progressOverlay = findViewById<FrameLayout>(R.id.progress_overlay);
                            progressOverlay.setVisibility(View.VISIBLE)
                            reff.child((-device.id).toString()).child("name").setValue(device.name)
                            reff.child((-device.id).toString()).child("type").setValue(device.type)
                            reff.child((-device.id).toString()).child("topic").setValue(device.topic)
                            reff.child((device.id).toString()).removeValue()
                            progressOverlay.setVisibility(View.INVISIBLE)
                        }
                    })
                    alert.setNegativeButton("Cancel", null)
                    alert.show()

                }

                active_control.isChecked = device.active
                number_control_input.setText(device.temp.toString())
                number_control_input.setOnFocusChangeListener { view, isFocus ->
                    try{
                        if(!isFocus){
                            val input = number_control_input.text.toString().toInt()
                            if (input < min) {
                                Toast.makeText(this@DeviceActivity, "Input Temperature must be greater than " + min.toString() , Toast.LENGTH_SHORT).show()
                                number_control_input.setText(min.toString())
                            }
                            if (input > max) {
                                Toast.makeText(this@DeviceActivity, "Input Temperature must be smaller than " + max.toString(), Toast.LENGTH_SHORT).show()
                                number_control_input.setText(max.toString())
                            }
                            seek_b_control_input.setProgress(input)
                        }
                        else
                            seek_b_control_input.setProgress(number_control_input.text.toString().toInt())
                    }catch (fne:NumberFormatException){
                        Toast.makeText(this@DeviceActivity, "Wrong number format", Toast.LENGTH_SHORT).show()
                        editText_temp.setText("0")
                        seek_b_control_input.setProgress(number_control_input.text.toString().toInt())
                    }
                }

                active_control.setOnCheckedChangeListener(object: CompoundButton.OnCheckedChangeListener{
                    override fun onCheckedChanged(buttonView: CompoundButton , isChecked: Boolean ) {
                        seek_b_control_input.setProgress(seek_b_control_input.getProgress())
                    }
                })
                seek_b_control_input.setOnSeekBarChangeListener(object :SeekBar.OnSeekBarChangeListener {

                    override fun onProgressChanged(seekBar: SeekBar, progress: Int , fromUser: Boolean ) {
                        // Notification that the progress level has changed.
                        if (progress < min) {
                            seekBar.setProgress(min);
                        }
                        val input = number_control_input.text.toString().toInt()
                        number_control_input.setText(seekBar.progress.toString())
                        if (input == device_origin.temp && active_control.isChecked == device_origin.active)
                        {
                            control_perform_button.setEnabled(false)
                            control_perform_button.setTextColor(ResourcesCompat.getColor(getResources(), android.R.color.darker_gray, null))
                            number_control_input.setTextColor(ResourcesCompat.getColor(getResources(), android.R.color.darker_gray, null))
                        }
                        else
                        {
                            control_perform_button.setEnabled(true)
                            control_perform_button.setTextColor(ResourcesCompat.getColor(getResources(), android.R.color.black, null))
                            number_control_input.setTextColor(ResourcesCompat.getColor(getResources(), android.R.color.black, null))
                        }
                    }


                    override fun onStartTrackingTouch(seekBar: SeekBar) {
                        // Notification that the user has started a touch gesture.
                        val input = number_control_input.text.toString().toInt()
                        if (input == device_origin.temp && active_control.isChecked == device_origin.active)
                        {
                            control_perform_button.setEnabled(false)
                            control_perform_button.setTextColor(ResourcesCompat.getColor(getResources(), android.R.color.darker_gray, null))
                            number_control_input.setTextColor(ResourcesCompat.getColor(getResources(), android.R.color.darker_gray, null))
                        }
                        else
                        {
                            control_perform_button.setEnabled(true)
                            control_perform_button.setTextColor(ResourcesCompat.getColor(getResources(), android.R.color.black, null))
                            number_control_input.setTextColor(ResourcesCompat.getColor(getResources(), android.R.color.black, null))
                        }
                        return
                    }

                    override fun onStopTrackingTouch(seekBar: SeekBar) {
                        // Notification that the user has finished a touch gesture.
                        return
                    }
                })
                seek_b_control_input.max = max
                seek_b_control_input.setProgress(number_control_input.text.toString().toInt())
                blurDialog.show()

                control_perform_button.setOnClickListener {

                    device.temp = number_control_input.text.toString().toInt()
                    device.active = active_control.isChecked
                    val uid = Firebase.auth.currentUser?.uid

                    val ref = FirebaseDatabase.getInstance().getReference().child(uid.toString())

                    ref.addValueEventListener(object : ValueEventListener {
                        override fun onDataChange(dataSnapshot: DataSnapshot) {
                            Toast.makeText(this@DeviceActivity, "Firebase: data has changed", Toast.LENGTH_SHORT).show()
                        }
                        override fun onCancelled(error: DatabaseError) {
                            Toast.makeText(this@DeviceActivity, "Firebase: modify request inorged", Toast.LENGTH_SHORT).show()
                        }
                    })

                    val reff = Firebase.database.reference
                    reff.child(uid.toString()).child((device.id).toString()).child("temp").setValue(device.temp)
                            .addOnSuccessListener {
                                Toast.makeText(this@DeviceActivity, "Send Successfully", Toast.LENGTH_SHORT).show()
                                blurDialog.hide()
                                loadDeviceData()
                            }

                            .addOnFailureListener {
                                val alert = AlertDialog.Builder(this@DeviceActivity)
                                alert.setMessage("Error Occured")
                                alert.setTitle("Can't modify device value")
                                alert.setPositiveButton("Retry", DialogInterface.OnClickListener { dialog, whichButton ->
                                    run {
                                        reff.child(uid.toString()).child((device.id).toString()).child("temp").setValue(device.temp)                        }
                                })
                                alert.setNegativeButton("Cancel", DialogInterface.OnClickListener { dialog, whichButton ->
                                    run {
                                        blurDialog.hide()}
                                })
                            }
                    reff.child(uid.toString()).child((device.id).toString()).child("active").setValue(device.active)
                            .addOnSuccessListener {
                                Toast.makeText(this@DeviceActivity, "State Changed Successfully", Toast.LENGTH_SHORT).show()
                                blurDialog.hide()
                                loadDeviceData()
                            }

                            .addOnFailureListener {
                                val alert = AlertDialog.Builder(this@DeviceActivity)
                                alert.setMessage("Error Occured")
                                alert.setTitle("Can't modify device state")
                                alert.setPositiveButton("Retry", DialogInterface.OnClickListener { dialog, whichButton ->
                                    run {
                                        reff.child(uid.toString()).child((device.id).toString()).child("temp").setValue(device.temp)                        }
                                })
                                alert.setNegativeButton("Cancel", DialogInterface.OnClickListener { dialog, whichButton ->
                                    run {
                                        blurDialog.hide()}
                                })
                            }
                }

            }
            override fun onItemLongClick(view: View?, position: Int) {
                return
            }
        }))


        val drawerLayout: DrawerLayout = findViewById(R.id.drawer_layout)
        val navView: NavigationView = findViewById(R.id.nav_view)
        val toggle = ActionBarDrawerToggle(
            this, drawerLayout, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close
        )
        drawerLayout.addDrawerListener(toggle)
        toggle.syncState()
        navView.setNavigationItemSelectedListener(this)
        startService(Intent(this, FireBaseService::class.java))

    }

    var doubleBackToExitPressedOnce = false;
    override fun onBackPressed() {
        val drawerLayout: DrawerLayout = findViewById(R.id.drawer_layout)
        val blurDialog = findViewById<BlurDialog>(R.id.blurView)
        if (blurDialog.visibility == View.VISIBLE) blurDialog.hide()
        else if (drawerLayout.isDrawerOpen(GravityCompat.START)) {
            drawerLayout.closeDrawer(GravityCompat.START)
        } else {
            if (doubleBackToExitPressedOnce) {
                val intent = Intent(Intent.ACTION_MAIN)
                intent.addCategory(Intent.CATEGORY_HOME)
                intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
                intent.putExtra("EXIT", true)
                startActivity(intent)

            }

            this.doubleBackToExitPressedOnce = true
            Toast.makeText(this, "Please click BACK again to exit", Toast.LENGTH_SHORT).show()

            Handler().postDelayed(Runnable { doubleBackToExitPressedOnce = false }, 2000)
        }

    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        // Inflate the menu; this adds items to the action bar if it is present.
        menuInflater.inflate(R.menu.main, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        return when (item.itemId) {
            R.id.action_settings -> true
            else -> super.onOptionsItemSelected(item)
        }
    }

    override fun onNavigationItemSelected(item: MenuItem): Boolean {
        // Handle navigation view item clicks here.
        when (item.itemId) {
            R.id.nav_devices -> {
                // Handle the camera action
            }
            R.id.nav_account -> {
                val intent = Intent(this, AccountActivity::class.java)
                startActivity(intent)
            }
            R.id.nav_notifications -> {
                val intent = Intent(this, NotificationActivity::class.java)
                startActivity(intent)
            }
            R.id.nav_email -> {

            }
            R.id.nav_about -> {

            }
        }
        val drawerLayout: DrawerLayout = findViewById(R.id.drawer_layout)
        drawerLayout.closeDrawer(GravityCompat.START)
        return true
    }

    private fun loadDeviceData(){
        val progressOverlay = findViewById<FrameLayout>(R.id.progress_overlay);
        progressOverlay.setVisibility(View.VISIBLE);

        val recyclerView = findViewById<androidx.recyclerview.widget.RecyclerView>(R.id.ryc_view)

        val uid = Firebase.auth.currentUser?.uid
        val ref = FirebaseDatabase.getInstance().getReference().child(uid.toString())
//        dialog.show()
        ref.addValueEventListener(object : ValueEventListener {
            override fun onDataChange(dataSnapshot: DataSnapshot) {
                //Toast.makeText(this@DeviceActivity, "Generated ID", Toast.LENGTH_SHORT).show()

                dataList.clear()
                for (postSnapshot in dataSnapshot.children) {
                    //Toast.makeText(this@DeviceActivity, postSnapshot.child("id").toString(), Toast.LENGTH_SHORT).show()
                    if (postSnapshot.key.toString().toInt() > 0)
                    dataList.add(Device(postSnapshot.child("id").getValue().toString().toInt(),
                            postSnapshot.child("name").getValue().toString(),
                            postSnapshot.child("type").getValue().toString().toInt(),
                            postSnapshot.child("topic").getValue().toString(),
                            postSnapshot.child("active").getValue().toString().toBoolean(),
                            postSnapshot.child("temp").getValue().toString().toInt()
                    ))
                    progressOverlay.setVisibility(View.INVISIBLE);
                    val rvAdapter = RvAdapter(dataList)
                    recyclerView.adapter = rvAdapter
                    Toast.makeText(this@DeviceActivity, "Loaded", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onCancelled(error: DatabaseError) {
                progressOverlay.setVisibility(View.INVISIBLE);
                Toast.makeText(this@DeviceActivity, "Failed to generate ID", Toast.LENGTH_SHORT).show()

            }
        })

        val rvAdapter = RvAdapter(dataList)
        recyclerView.adapter = rvAdapter

    }
    public override fun onStart() {
        super.onStart()
        nav_view.setCheckedItem(R.id.nav_devices)
        val intent = intent
        Toast.makeText(this, intent.getBooleanExtra("RELOAD_NEEDED",true).toString(),Toast.LENGTH_LONG).show()
        loadDeviceData()
    }

}

