import React from 'react';

function ShareForm() {
	return (
		<form
			action=''
			className='m-auto text-center mt-20 max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl px-2 md:px-4 lg:px-8 pb-36'
		>
			<div className='flex flex-col gap-2'>
				<label className='text-start' htmlFor='secret'>
					Enter secret
				</label>
				<textarea
					placeholder='Enter your secret here'
					className='outline-gray-500 outline-1 p-2 rounded-md bg-black border-gray-700 border'
					name='secret'
					id='secret'
					rows={5}
				/>
			</div>
			<div className='flex flex-col sm:flex-row items-center mt-6 border-gray-700 border p-4 rounded-md gap-2'>
				<div className='flex flex-1 items-center justify-between w-full'>
                <label htmlFor='expiry'>Expire after</label>
				<select
					name='expiry'
					id='expiry'
					className='cursor-pointer bg-black border-gray-700 border rounded-md px-1 pr-10 py-1 '
				>
					<option value='1'>1 day</option>
					<option value='3'>3 days</option>
					<option value='7'>1 week</option>
				</select>
                </div>
                <div className='flex flex-1 items-center justify-between w-full'>
				<label htmlFor='open-expire'>Expire on open</label>
				<label className='inline-flex items-center cursor-pointer'>
					<input type='checkbox' name='open-expire' id='expire-open' value='' className='sr-only peer' />
					<div className="relative w-11 h-6 bg-gray-200 border-gray-700 border peer-focus:outline-none rounded-full peer dark:bg-black peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-700"></div>
				</label>
                </div>


			</div>
			<input type="submit" value="Generate Link" className='mt-10 rounded-md border bg-gray-900 border-gray-700 px-5 py-2 hover:cursor-pointer hover:bg-black' />
		</form>
	);
}

export default ShareForm;
