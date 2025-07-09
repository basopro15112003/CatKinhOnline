using CatKinhOnline.ModelDTOs;
using CatKinhOnline.Models;
using CatKinhOnline.Repositories.AddressRepository;
using ISUZU_NEXT.Server.Core.Extentions;
using Microsoft.IdentityModel.Tokens;
using System.Text.RegularExpressions;

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

        #region validate Address      
        /// <summary>
        /// validate an address before adding or updating it.
        /// </summary>
        /// <param name="address"></param>
        /// <returns></returns>
        public APIResponse ValidateAddress(AddressDTO address)
            {
             if (address == null)
                {
                return new APIResponse { IsSuccess=false, Message="Địa chỉ không được để trống" };
                }
             if(address.ContactName.IsNullOrEmpty()||address.ContactName.Length<6||address.ContactName.Length>50)
                {
                return new APIResponse { IsSuccess=false, Message="Tên liên hệ không hợp lệ. Độ dài từ 3 đến 50 ký tự." };
                }
             if(address.ContactPhone.IsNullOrEmpty())
                {
                return new APIResponse { IsSuccess=false, Message="Số điện thoại liên hệ không được để trống" };
                }
            if (!Regex.IsMatch(address.ContactPhone.Trim(), @"^0[0-9]{9}$"))
                {
                return new APIResponse { IsSuccess=false, Message="Số điện thoại không hợp lệ" };
                }
            if (address.AddressLine.IsNullOrEmpty()||address.AddressLine.Length<10||address.AddressLine.Length>200)
                {
                return new APIResponse { IsSuccess=false, Message="Địa chỉ không hợp lệ. Độ dài từ 10 đến 200 ký tự." };
                }
            if(address.Note!=null&&address.Note.Length>200)
                {
                return new APIResponse { IsSuccess=false, Message="Ghi chú không hợp lệ. Độ dài tối đa là 200 ký tự." };
                }
            return new APIResponse { IsSuccess=true, Message="Địa chỉ hợp lệ" };
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
                var validationResult = ValidateAddress(address);
                if (!validationResult.IsSuccess)
                    {
                    return validationResult; 
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
                var validationResult = ValidateAddress(address);
                if (!validationResult.IsSuccess)
                    {
                    return validationResult;
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
