import React from 'react'

export default function PublicationForm({onClose}){
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold mb-3">Add Publication</h3>
      <form className="space-y-3" onSubmit={(e)=>{e.preventDefault(); onClose && onClose()}}>
        <div>
          <input placeholder="Title" className="w-full border p-2 rounded" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input placeholder="Type (Journal/Conference)" className="border p-2 rounded" />
          <input placeholder="Year" className="border p-2 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <input type="file" />
          <button className="px-3 py-1 rounded bg-dsu-maroon text-white">Upload Proof</button>
        </div>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-3 py-1 rounded border">Cancel</button>
          <button type="submit" className="px-3 py-1 rounded bg-dsu-maroon text-white">Save</button>
        </div>
      </form>
    </div>
  )
}
