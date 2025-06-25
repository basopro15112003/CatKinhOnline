using CatKinhOnline.Models;

namespace CatKinhOnline.Repositories.AddressRepository
    {
    public interface IAddressRepository
        {
        Task<List<Address>> GetAllAddresses();
        Task<List<Address>> GetAddressByUserId(int userId);
        Task<bool> AddAddress(Address address);
        Task<bool> UpdateAddress(Address address);
        Task<bool> DeleteAddress(int id);
        }
    }
