package com.example.myapplication

import androidx.recyclerview.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import layout.Device

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
    }
    class ViewHolder(itemView: View) : androidx.recyclerview.widget.RecyclerView.ViewHolder(itemView) {
        val name = itemView.findViewById<TextView>(R.id.temper)

    }
}