using CatKinhOnline.AppDbContext;
using CatKinhOnline.Models;
using Microsoft.EntityFrameworkCore;

namespace CatKinhOnline.Repositories.AddressRepository
    {
    public class AddressRepository : IAddressRepository
        {
        public AddressRepository() { }

        #region get all addresses
        /// <summary>
        /// get all addresses from the database.
        /// </summary>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<List<Address>> GetAllAddresses()
            {
            try
                {
                using (var _db = new MyDbContext())
                    {
                    var addresses = await _db.Addresses.ToListAsync();
                    return addresses;
                    }
                }
            catch (Exception ex)
                {
                throw new Exception(ex.Message);
                }
            }
        #endregion

        #region get address by id
        /// <summary>
        /// get an address by its ID from the database.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<Address> GetAddressById(int id)
            {
            try
                {
                using (var _db = new MyDbContext())
                    {
                    var address = await _db.Addresses.FindAsync(id);
                    if (address==null)
                        {
                        throw new Exception("Address not found");
                        }
                    return address;
                    }
                }
            catch (Exception ex)
                {
                throw new Exception(ex.Message);
                }
            }
        #endregion

        #region get address by Userid
        /// <summary>
        /// get an address by its USERID from the database.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<List<Address>> GetAddressByUserId(int userId)
            {
            try
                {
                using (var _db = new MyDbContext())
                    {
                    var address = await _db.Addresses.Where(x=> x.UserId == userId&&!x.IsDeleted).ToListAsync();
                    return address;
                    }
                }
            catch (Exception ex)
                {
                throw new Exception(ex.Message);
                }
            }
        #endregion

        #region add address
        /// <summary>
        /// add a new address to the database.
        /// </summary>
        /// <param name="address"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        /// <exception cref="Exception"></exception>
        public async Task<bool> AddAddress(Address address)
            {
            if (address==null)
                {
                throw new ArgumentNullException(nameof(address), "Address cannot be null");
                }
            try
                {
                using (var _db = new MyDbContext())
                    {
                    await _db.Addresses.AddAsync(address);
                    await _db.SaveChangesAsync();
                    return true;
                    }
                }
            catch (Exception ex)
                {
                throw new Exception(ex.Message);
                }
            }
        #endregion

        #region update address
        /// <summary>
        /// update an existing address in the database.
        /// </summary>
        /// <param name="address"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        /// <exception cref="Exception"></exception>
        public async Task<bool> UpdateAddress(Address address)
            {
            if (address==null)
                {
                throw new ArgumentNullException(nameof(address), "Address cannot be null");
                }
            try
                {
                using (var _db = new MyDbContext())
                    {
                    _db.Addresses.Update(address);
                    await _db.SaveChangesAsync();
                    return true;
                    }
                }
            catch (Exception ex)
                {
                throw new Exception(ex.Message);
                }
            }
        #endregion

        #region delete address
        /// <summary>
        /// delete an address by its ID from the database.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<bool> DeleteAddress(int id)
            {
            try
                {
                using (var _db = new MyDbContext())
                    {
                    var address = await _db.Addresses.FindAsync(id);
                    if (address==null)
                        {
                        return false; // Address not found
                        }
                    address.IsDeleted=true; 
                    await _db.SaveChangesAsync();
                    return true; 
                    }
                }
            catch (Exception ex)
                {
                throw new Exception(ex.Message);
                }
            }
        #endregion

        }

    }
