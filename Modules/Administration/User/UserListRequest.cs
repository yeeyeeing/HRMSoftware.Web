﻿using Microsoft.AspNetCore.DataProtection;
using Newtonsoft.Json;
using Serenity.Services;

namespace HRMSoftware.Administration
{
    public class UserListRequest : ListRequest
    {
        [JsonIgnore]
        internal IDataProtector DataProtector;
        [JsonIgnore]
        internal byte[] ClientHash;
    }
}