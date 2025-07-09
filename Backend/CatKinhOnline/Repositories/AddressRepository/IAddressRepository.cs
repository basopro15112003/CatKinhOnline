using CatKinhOnline.Models;

namespace CatKinhOnline.Repositories.AddressRepository
    {
    public interface IAddressRepository
        {
        Task<List<Address>> GetAllAddresses();
        Task<Address> GetAddressById(int id);
        Task<List<Address>> GetAddressByUserId(int userId);
        Task<bool> AddAddress(Address address);
        Task<bool> UpdateAddress(Address address);
        Task<bool> DeleteAddress(int id);
        }
    }
