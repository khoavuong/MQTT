package layout

import java.util.*

data class Device(val id: Int,val name: String = "",
                  val date: Date = Date(2020,1,1),
                  val active: Boolean = false,
                  val temp: Int = 20)
