package com.example.myapplication

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AbsListView
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.content.res.AppCompatResources.getDrawable
import layout.Device
import android.widget.Toast



class RvAdapter(val devList: ArrayList<Device>) : androidx.recyclerview.widget.RecyclerView.Adapter<RvAdapter.ViewHolder>() {
    override fun onCreateViewHolder(p0: ViewGroup, p1: Int): ViewHolder {
        val v = LayoutInflater.from(p0?.context).inflate(R.layout.list_item, p0, false)

        return ViewHolder(v);
    }
    override fun getItemCount(): Int {
        return devList.size
    }
    override fun onBindViewHolder(p0: ViewHolder, p1: Int) {
        p0.name?.text = devList[p1].name
        p0.value?.text = devList[p1].temp.toString()
        if (devList[p1].type == 1){
            p0.unit?.text = "°C"
            p0.image?.setImageResource(R.drawable.test)
        }
        else if (devList[p1].type == 2){
            p0.unit?.text = "%"
        }
        else if (devList[p1].type == 3){
            p0.unit?.text = "/3"
        }
        p0.topic?.text = devList[p1].topic
    }
    fun getItem(position: Int): Device{
        return devList.get(position)
    }
    class ViewHolder(itemView: View) : androidx.recyclerview.widget.RecyclerView.ViewHolder(itemView) {
        val name = itemView.findViewById<TextView>(R.id.item_name)
        val value = itemView.findViewById<TextView>(R.id.item_value)
        val unit = itemView.findViewById<TextView>(R.id.item_value_unit)
        val image = itemView.findViewById<ImageView>(R.id.item_image)
        val topic = itemView.findViewById<TextView>(R.id.item_topic)

    }
}