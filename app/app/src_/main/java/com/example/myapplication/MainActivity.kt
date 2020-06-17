package com.example.myapplication

import android.content.Intent
import android.os.Bundle
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.google.android.material.snackbar.Snackbar
import androidx.core.view.GravityCompat
import androidx.appcompat.app.ActionBarDrawerToggle
import android.view.MenuItem
import androidx.drawerlayout.widget.DrawerLayout
import com.google.android.material.navigation.NavigationView
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.RecyclerView
import androidx.appcompat.widget.Toolbar
import android.view.Menu
import layout.Device
import java.util.*

class MainActivity : AppCompatActivity(), NavigationView.OnNavigationItemSelectedListener {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val toolbar: Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)

        val fab: FloatingActionButton = findViewById(R.id.fab)
        fab.setOnClickListener { view ->
            Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                .setAction("Action", null).show()
        }
        val recyclerView = findViewById<androidx.recyclerview.widget.RecyclerView>(R.id.ryc_view)
        val dataList = ArrayList<Device>()
        dataList.add(Device(0, "Living Room Temp",
            Date(2020,1,1),true, 21))
        dataList.add(Device(1, "Kitchen Temp",
            Date(2020,1,1),true, 21))
        dataList.add(Device(2, "Bed Room Floor1 Temp",
            Date(2020,1,1),true, 21))
        dataList.add(Device(3, "Bed Room Floor2 Temp",
            Date(2020,1,1),true, 21))
        dataList.add(Device(4, "Bath Room Temp",
            Date(2020,1,1),true, 21))
        dataList.add(Device(5, "Back Room Temp",
            Date(2020,1,1),true, 21))
        print("????:" + dataList)
        val rvAdapter = RvAdapter(dataList)
        recyclerView.adapter = rvAdapter
        val drawerLayout: DrawerLayout = findViewById(R.id.drawer_layout)
        val navView: NavigationView = findViewById(R.id.nav_view)
        val toggle = ActionBarDrawerToggle(
            this, drawerLayout, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close
        )
        drawerLayout.addDrawerListener(toggle)
        toggle.syncState()

        navView.setNavigationItemSelectedListener(this)
    }

    override fun onBackPressed() {
        val drawerLayout: DrawerLayout = findViewById(R.id.drawer_layout)
        if (drawerLayout.isDrawerOpen(GravityCompat.START)) {
            drawerLayout.closeDrawer(GravityCompat.START)
        } else {
            super.onBackPressed()
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
                //val intent = Intent(this, LoginActivity::class.java)
                //startActivity(intent)
            }
            R.id.nav_notifications -> {

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


}
