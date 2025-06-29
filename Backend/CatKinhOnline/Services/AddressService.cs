using CatKinhOnline.ModelDTOs;
using CatKinhOnline.Models;
using CatKinhOnline.Repositories.AddressRepository;
using ISUZU_NEXT.Server.Core.Extentions;

namespace CatKinhOnline.Services
    {
    public class AddressService
        {
        private readonly IAddressRepository _addressRepository;
        public AddressService(IAddressRepository addressRepository)
            {
            _addressRepository=addressRepository;
            }

        #region get all addresses
        /// <summary>
        /// get all addresses from the database.
        /// </summary>
        /// <returns></returns>
        public async Task<APIResponse> GetAllAddress()
            {
            try
                {
                var addresses = await _addressRepository.GetAllAddresses();
                var addressDTOs = new List<AddressDTO>();
                foreach (var item in addresses)
                    {
                    var adressDTO = new AddressDTO();
                    adressDTO.CopyProperties(item);
                    addressDTOs.Add(adressDTO);
                    }
                return new APIResponse { IsSuccess=true, Result =addressDTOs };
                }
            catch (Exception ex)
                {
                return new APIResponse { IsSuccess=false, Message="Lỗi không lấy được dữ liệu địa chỉ :" + ex.Message };
                }
            }
        #endregion

        #region get address by id
        /// <summary>
        /// get an address by its ID from the database.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<APIResponse> GetAddressById(int id)
            {
            try
                {
                var address = await _addressRepository.GetAddressById(id);
                if (address==null)
                    {
                    return new APIResponse { IsSuccess=true, Message="Không tìm thấy địa chỉ với ID này" };
                    }
                var addressDTO = new AddressDTO();
                addressDTO.CopyProperties(address);
                return new APIResponse { IsSuccess=true, Result=addressDTO };
                }
            catch (Exception ex)
                {
                return new APIResponse { IsSuccess=false, Message="Lỗi không lấy được dữ liệu địa chỉ :"+ex.Message };
                }
            }
        #endregion

        #region get address by UserId
        /// <summary>
        /// get an address by its USERID from the database.
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<APIResponse> GetAddressByUserId(int userId)
            {
            try
                {
                var address = await _addressRepository.GetAddressByUserId(userId);
                if (address==null||!address.Any())
                    {
                    return new APIResponse { IsSuccess=true, Message="Không tìm thấy địa chỉ cho người dùng này" };
                    }
                List<AddressDTO> addressDTOs = new List<AddressDTO>();
                foreach (var item in address)
                    {
                    var addressDTO = new AddressDTO();
                    addressDTO.CopyProperties(item);
                    addressDTOs.Add(addressDTO);
                    }
                return new APIResponse { IsSuccess=true, Result=addressDTOs };
                }
            catch (Exception ex)
                {
                return new APIResponse { IsSuccess=false, Message="Lỗi không lấy được dữ liệu địa chỉ :"+ex.Message };
                }
            }
        #endregion

        #region add address
        /// <summary>
        /// add a new address to the database.
        /// </summary>
        /// <param name="address"></param>
        /// <returns></returns>
        public async Task<APIResponse> AddAddress(AddressDTO address)
            {
            try
                {
                if (address==null)
                    {
                    return new APIResponse { IsSuccess=false, Message="Địa chỉ không được để trống" };
                    }
                var addressEntity = new Address();
                addressEntity.CopyProperties(address);
                var addedAddress = await _addressRepository.AddAddress(addressEntity);
                if (!addedAddress)
                    {
                    return new APIResponse { IsSuccess=false, Message="Thêm địa chỉ thất bại" };
                    }
                return new APIResponse { IsSuccess=true, Message="Thêm địa chỉ thành công" };
                }
            catch (Exception ex)
                {
                return new APIResponse { IsSuccess=false, Message="Lỗi không thêm được địa chỉ :"+ex.Message };
                }
            }
        #endregion

        #region update address
        /// <summary>
        /// update an existing address in the database.
        /// </summary>
        /// <param name="address"></param>
        /// <returns></returns>
        public async Task<APIResponse> UpdateAddress(AddressDTO address)
            {
            try
                {
                if (address==null)
                    {
                    return new APIResponse { IsSuccess=false, Message="Địa chỉ không được để trống" };
                    }
                var addressEntity = new Address();
                addressEntity.CopyProperties(address);
                var updatedAddress = await _addressRepository.UpdateAddress(addressEntity);
                if (!updatedAddress)
                    {
                    return new APIResponse { IsSuccess=false, Message="Cập nhật địa chỉ thất bại" };
                    }
                else
                    {
                    return new APIResponse { IsSuccess=true, Message="Cập nhật địa chỉ thành công" };
                    }
                }
            catch (Exception ex)
                {
                return new APIResponse { IsSuccess=false, Message="Lỗi không cập nhật được địa chỉ : "+ex.Message };
                }
            }
        #endregion

        #region delete address
        /// <summary>
        /// delete an address by its ID from the database.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<APIResponse> DeleteAddress(int id)
            {
            try
                {
                var isDeleted = await _addressRepository.DeleteAddress(id);
                if (isDeleted)
                    {
                    return new APIResponse { IsSuccess=true, Message="Xóa địa chỉ thành công" };
                    }
                return new APIResponse { IsSuccess=false, Message="Không tìm thấy địa chỉ để xóa" };
                }
            catch (Exception ex)
                {
                return new APIResponse { IsSuccess=false, Message="Lỗi không xóa được địa chỉ :"+ex.Message };
                }
            }
        #endregion

        }
    }      
