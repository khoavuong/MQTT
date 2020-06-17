package com.example.myapplication

import android.media.Image
import kotlin.math.log

class UserSingleton private constructor() {

    private object Holder { val INSTANCE = UserSingleton() }

    private var id: Int
    internal var name: String
    internal var loged_in: Boolean
    internal var image_url: String
    internal var email: String
    private var password: String
    init {
        id = -1
        name = "nonameuser"
        loged_in = false
        image_url = ""
        email = "noname@email"
        password = ""
    }
    fun reset(){
        id = -1
        name = "nonamereseted"
        loged_in = false
        image_url = ""
        email = "reseted@"
        password = ""
    }
    companion object {
        @JvmStatic
        fun getInstance(): UserSingleton{
            return Holder.INSTANCE
        }

    }

}