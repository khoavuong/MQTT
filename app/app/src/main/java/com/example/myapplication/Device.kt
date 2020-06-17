package layout

import android.app.ProgressDialog
import java.util.*

data class Device(val id: Int,val name: String = "",
                  val type: Int = 1,
                  val topic: String = "#",
                  var active: Boolean = false,
                  var temp: Int = 20)
object genId{
    var maxId: Long = 0
}
object dataListHolder{
    val dataList = ArrayList<Device>()
}

