import android.app.Service
import android.content.Intent
import android.os.IBinder
import android.widget.Toast
import com.example.myapplication.MainActivity
import com.google.firebase.FirebaseError
import com.google.firebase.auth.ktx.auth
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.ValueEventListener
import com.google.firebase.database.ktx.database
import com.google.firebase.ktx.Firebase
import layout.genId

class FireBaseService : Service() {
    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    private fun fireBaseBattery (): HashMap<String, String>{
        return HashMap(2, 1.0F)
    }

    override fun onCreate() {
        super.onCreate()

        var fireBaseBattery = HashMap<String,String>();
        val user = Firebase.auth.currentUser
        val firebaseRef_Battery = Firebase.database.reference.child(user?.uid.toString());

        firebaseRef_Battery.addValueEventListener(object : ValueEventListener {
            override fun onDataChange(dataSnapshot: DataSnapshot) {
                if (dataSnapshot.getValue() != null) {
                    val fireBaseBattery  =  dataSnapshot.getValue() as HashMap<String, String>
                    val battery = fireBaseBattery.get("battery");
                    val battery_int = battery.toString().toInt()

                    System.out.println("SERVICE FIREBASE : " + battery);
                    if (battery_int <= 10) {
                        val intent = Intent(getApplicationContext(), MainActivity::class.java);
                        startActivity(intent);
                    }
                }
            }

            override fun onCancelled(error: DatabaseError) {
                Toast.makeText(getApplicationContext(), error.toString(), Toast.LENGTH_SHORT).show()
            }
        })
    }
}
